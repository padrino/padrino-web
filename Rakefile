desc "Updates all blog posts and guides from docs source"
task :update do
  # Update submodule
  sh "git submodule update"
  # Pull latest changes from docs master
  Dir.chdir("docs") { sh "cd docs; git stash; git checkout master; git pull origin master; git stash pop; true" }
  # Commit latest revision
  sh "git commit -am 'Update docs submodule'; true"
end

desc "Builds the static middleman site to build directory"
task :build => :update do
  sh "middleman build"
end

task :deploy => :build do
  sh "middleman deploy"
end
