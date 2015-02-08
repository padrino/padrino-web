require 'kramdown'
require 'rouge'

# Helpers
helpers do
  # ...
end

# Pretty URLs (Directory Indexes)
activate :directory_indexes

# Assets configuration
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

# Markdown configration
set :markdown_engine, :kramdown
set :markdown, syntax_highlighter: 'rouge'

# Set layouts
page 'guides/*', :layout => :guides

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
