# =============================================================================
# GENERAL SETTINGS
# =============================================================================

set :application,  "padrino_web"
set :deploy_to,  "/var/apps/#{application}"
set :deploy_via, :remote_cache
set :scm, :git
set :repository, "git@github.com:angeloashmore/padrino-web.git"
set :git_enable_submodules, 0
set :keep_releases, 3
set :shared_children, shared_children + %w{public/uploads}

# =============================================================================
# STAGE SETTINGS
# =============================================================================

# set :default_stage, "experimental"
set :stages, %w(production staging)
set :default_stage, "production"
require 'capistrano/ext/multistage'

# =============================================================================
# RECIPE INCLUDES
# =============================================================================

require 'rubygems'
# require 'cap_recipes/tasks/whenever'
# require 'cap_recipes/tasks/apache'
# require 'cap_recipes/tasks/memcache'
require 'bundler/capistrano'
# require 'new_relic/recipes'
require 'capistrano/maintenance'

namespace :deploy do
	task :start do
		run "service nginx start"
	end

	task :stop do
		run "service nginx stop"
	end

	task :restart, :roles => :app, :except => { :no_release => true } do
		run "#{try_sudo} touch #{File.join(current_path, 'tmp', 'restart.txt')}"
	end

	desc "Symlink shared configs and folders on each release."
	task :symlink_shared do
		# run "ln -nfs #{shared_path}/system/settings.yml #{release_path}/config/settings.yml"
	end

	task :migrate do
		# Do nothing
	end

	task :flush do
		# run "#{try_sudo} god restart memcached"
	end
end

ssh_options[:paranoid] = false
default_run_options[:pty] = true

# PASSENGER
# set :base_ruby_path, '/opt/ruby-enterprise' # not /usr

# HOOKS
after  "deploy:update_code","deploy:symlink_shared" # symlinks shared dirs
# after "deploy:update", "newrelic:notice_deployment"