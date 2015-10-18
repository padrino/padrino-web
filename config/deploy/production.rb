# Domain
role :web, "codepath.com"
role :app, "codepath.com"
role :db,  "codepath.com", :primary => true

# GENERAL
set :user, "deploy"
set :runner, "deploy"
set :use_sudo, true
ssh_options[:keys] = [File.join(ENV["HOME"], ".ssh", "id_rsa")]
ssh_options[:forward_agent] = true
default_run_options[:pty] = true

# Branch
set :branch, 'master'