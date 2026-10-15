# Guides, blog posts and llms.txt live in the docs submodule
files.watch :source, path: File.join(__dir__, 'docs'),
  only: [%r{\A(blog|guides)/}, /\Allms(-full)?\.txt\z/]

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/index.html', layout: :layout
page '/guides/*', layout: :guide, data: { sidebar: '/_partials/guides_sidebar' }
page '/blog/*', data: { sidebar: '/_partials/blog_sidebar' }
page '/blog.html', layout: :sidebar, data: { sidebar: '/_partials/blog_sidebar' }
proxy '/guides.html', '/guides/01_introduction/01_overview.html'
proxy '/introduction.html', '/guides/01_introduction/01_overview.html'

require "middleman-core/renderers/redcarpet"

class CustomRenderer < Middleman::Renderers::MiddlemanRedcarpetHTML
  def header(text, header_level)
    "<h%s id=\"%s\">%s</h%s>" % [header_level, text.parameterize, text, header_level]
  end
end

# Helpers
helpers do
  def nav_link_to(link_text, url, options = {})
    if current_page.url.start_with?(url)
      options[:class] = [options[:class], 'is-active'].compact.join(' ')
      options['aria-current'] = 'page' if current_page.url == url
    end
    link_to(link_text, url, options)
  end

  def head_title
    page_title = current_page.data.title
    "Padrino - #{page_title.nil? ? config.default_title : page_title}"
  end

  def page_description
    description =
      if content_for?(:description) then yield_content(:description)
      elsif current_page.data.description then current_page.data.description
      elsif is_blog_article? then strip_tags(current_article.body)
      else config.default_description
      end

    description.gsub(/\s+/, ' ').strip.truncate(160, separator: ' ')
  end

  def canonical_url
    config.url_root + current_page.url
  end

  def recent_release_post
    blog.articles.find { |a| a.tags.include?("release") }
  end

  def guides
    resources = sitemap.resources.select do |r|
      r.path.start_with?('guides/') && r.path.end_with?('.html') &&
      !r.path.match(/^guides\/\d{2}_/) && r.path != 'guides/README.html'
    end

    resources.sort_by(&:target)
  end

  def guides_by_chapter
    guides.group_by { |c| c.data.chapter }
  end

  # blog-categories
  def categories(page)
    category_array(page.data[:categories])
  end

  def category_path(category)
    "/category/#{category.parameterize}/index.html"
  end

  def all_categories
    @all_categories ||= Hash[all_categories_unsorted.sort]
  end

  def category_array(categories)
    (categories || "Uncategorized").split(" ")
  end

  private

  def all_categories_unsorted
    Hash.new { [] }.tap do |all_categories|
      blog.articles.each do |article|
        categories(article).each do |ac|
          all_categories[ac] <<= article
        end
      end
    end
  end
end

# General configuration
set :layout, :content
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :markdown_engine, :redcarpet
set :markdown, :tables => true, :autolink => true, :gh_blockcode => true,
    :fenced_code_blocks => true, renderer: CustomRenderer
set :default_title, 'The Elegant Ruby Web Framework'
set :default_description, 'Padrino is a Ruby web framework built on Sinatra, with generators, ' \
  'helpers, an admin, mailers and caching, while staying small, fast and modular.'
set :url_root, 'https://padrinorb.com'

activate :blog,
  prefix: 'blog',
  layout: :blog_article,
  permalink: '{title}.html',
  paginate: true,
  per_page: 10,
  publish_future_dated: true

activate :directory_indexes
activate :syntax, css_class: 'syntax'
activate :search_engine_sitemap,
  exclude_if: -> (resource) {
    # Leave out date indexes, category pages and the numbered guide paths
    # (guides/01_introduction/...), which duplicate the clean guide URLs
    resource.path.match?(%r{\Ablog/\d{4}(/\d{2}){0,2}\.html\z}) ||
      resource.path.start_with?('category/') ||
      resource.path.match?(%r{\Aguides/\d{2}_})
  },
  default_change_frequency: 'weekly'
activate :robots,
  rules: [
    { user_agent: '*', allow: %w(/), disallow: %w(CNAME /*.js /*.css) }
  ],
  sitemap: 'https://padrinorb.com/sitemap.xml'
activate :deploy, deploy_method: :git

ready do
  sitemap.resources.select { |r| r.path.start_with?('guides/') }.each do |resource|
    path = resource.path.split('/')

    if path.size >= 3
      chapter = path[1][3..-1]
      title = path[2][3..-1]
      locals = { sidebar: '/_partials/guides_sidebar' }
      proxy "guides/#{chapter}/#{title}", path.join('/'), locals: locals
      proxy "guides/#{chapter}/#{title.sub(/\.html\z/, '.md')}", 'guide-source.txt',
        locals: { source_file: resource.source_file }, ignore: true
    end
  end
  sitemap.resources
    .map { |r| (r.data["categories"] || "Uncategorized").split(" ") }
    .flatten
    .uniq
    .each do |category|
    proxy "/category/#{category.parameterize}.html", "category.html", locals: { category: category },
      data: { title: "Posts in “#{category.gsub(",", "")}”" }
  end
end

# Development-specific configuration
configure :development do
  activate :livereload
  activate :disqus, :shortname => nil
end

ignore 'category.html.slim'

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript, compressor: -> { Terser.new }
  activate :asset_hash, ignore: [%r{images/og-image}]
  activate :relative_assets
  activate :disqus, :shortname => "padrinorb"
end
