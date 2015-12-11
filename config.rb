# Helpers
helpers do
  # nav_link_to("Home", "/home", :root => true, :class => "foo")
  def nav_link_to(link_text, url, options = {})
    root = options.delete(:root)
    is_active = (!root && current_page.url.start_with?(url)) ||
      current_page.url == url
    options[:class] ||= ''
    options[:class] << '--is-active' if is_active
    link_to(link_text, url, options)
  end

  def recent_release_post
    blog.articles.find { |a| a.tags.include?("release") }
  end
end

# Blog
activate :blog do |blog|
  blog.prefix = 'blog'
  blog.permalink = '{title}.html'
  blog.layout = 'article'
  blog.paginate = true
  blog.per_page = 2
end

# Syntax highlighting
activate :syntax

# Pretty URLs (Directory Indexes)
activate :directory_indexes

# Deployment
activate :deploy do |deploy|
  deploy.method = :git
end

# Assets configuration
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

# Markdown configration
set :markdown_engine, :kramdown

# Set layouts
page 'guides/*', :layout => :sidebar

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
