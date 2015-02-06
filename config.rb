require 'kramdown'
require 'rouge'
require 'middleman-gh-pages'

helpers do
  # ...
end

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

set :markdown_engine, :kramdown
set :markdown, syntax_highlighter: 'rouge'

# activate :syntax

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
