# Helpers
helpers do
  def nav_link_to(link_text, url, options = {})
    options[:class] ||= ''
    options[:class] << '--is-active' if url == current_page.url
    link_to(link_text, url, options)
  end
end

# Syntax highlighting
activate :syntax

# Pretty URLs (Directory Indexes)
activate :directory_indexes

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
