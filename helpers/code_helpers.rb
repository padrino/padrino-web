module CodeHelpers
  def highlight(code, language)
    Middleman::Syntax::Highlighter.highlight(code, language)
  end

  def latest_version
    recent_release_post.title[/Padrino ([\d.]+)/, 1]
  end
end
