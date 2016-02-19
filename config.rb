# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/guides/*', layout: :sidebar, data: { sidebar: '/_partials/guides_sidebar' }
page '/guides.html', layout: :sidebar, data: { sidebar: '/_partials/guides_sidebar' }
page '/blog/*', data: { sidebar: '/_partials/blog_sidebar' }
page '/blog.html', layout: :sidebar, data: { sidebar: '/_partials/blog_sidebar' }

# Helpers
helpers do
  def nav_link_to(link_text, url, options = {})
    root = options.delete(:root)
    is_active = (!root && current_page.url.start_with?(url)) ||
      current_page.url == url
    options[:class] ||= ''
    options[:class] << '--is-active' if is_active
    link_to(link_text, url, options)
  end

  def head_title
    page_title = current_page.data.title
    "Padrino - #{page_title.nil? ? config.default_title : page_title}"
  end

  def recent_release_post
    blog.articles.find { |a| a.tags.include?("release") }
  end
end

# General configuration
set :layout, :content
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :default_title, 'The Elegant Ruby Web Framework'
set :url_root, 'http://padrinorb.com'
set :disqus_embed_url, 'https://padrinorb.disqus.com/embed.js'

activate :blog,
  prefix: 'blog',
  layout: :blog_article,
  permalink: '{title}.html',
  paginate: true,
  per_page: 2
activate :syntax
activate :directory_indexes
# activate :search_engine_sitemap,
#   exclude_if: -> (resource) {
#     # Exclude all paths from sitemap that are sub-date indexes
#     resource.path.match(/[0-9]{4}(\/[0-9]{2})*.html/)
#   },
#   default_change_frequency: 'weekly'
# activate :robots,
#   rules: [
#     { user_agent: '*', allow: %w(/), disallow: %w(CNAME /*.js /*.css) }
#   ],
#   sitemap: 'http://padrinorb.com/sitemap.xml'
activate :deploy,
  deploy_method: :git
activate :external_pipeline,
  name: :webpack,
  command: build? ? './node_modules/webpack/bin/webpack.js --bail' : './node_modules/webpack/bin/webpack.js --watch -d',
  source: '.tmp/dist',
  latency: 1

# Development-specific configuration
configure :development do
  activate :livereload
end

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
  activate :relative_assets
end
