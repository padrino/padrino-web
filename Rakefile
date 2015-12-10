desc "Updates all blog posts and guides from docs source"
task :update do
  sh "git submodule update"
  Dir.chdir("docs") { sh "cd docs; git stash; git checkout master; git pull origin master; git stash pop; true" }
  sh "git commit -am 'update submodule'"
  FileUtils.cp_r 'docs/posts/.', 'source/blog'
  FileUtils.cp_r 'docs/guides/.', 'source/guides'
end
