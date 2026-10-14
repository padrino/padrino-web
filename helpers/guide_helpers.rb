module GuideHelpers
  DOCS_REPO = 'https://github.com/padrino/padrino-docs'.freeze

  def guide_toc(html)
    html.scan(%r{<h([23]) id="([^"]+)">(.*?)</h\1>}m).map do |level, id, text|
      { level: level.to_i, id: id, text: strip_tags(text) }
    end
  end

  def guide_neighbours
    index = guides.index { |resource| resource.url == current_page.url }
    return [nil, nil] unless index

    [index.zero? ? nil : guides[index - 1], guides[index + 1]]
  end

  def guide_markdown_url(resource)
    chapter, title = resource.source_file.split('/').last(2)
    "/guides/#{chapter[3..-1]}/#{title[3..-1].sub(/\.html\.md\z/, '.md')}"
  end

  def ask_ai_url(service, resource)
    prompt = "Read #{config[:url_root]}#{guide_markdown_url(resource)} so I can ask questions about it."
    base = { chatgpt: 'https://chatgpt.com/?q=', claude: 'https://claude.ai/new?q=' }.fetch(service)
    base + ERB::Util.url_encode(prompt)
  end

  def docs_relative_path(resource)
    Pathname(resource.source_file).relative_path_from(Pathname(File.join(app.root, 'docs'))).to_s
  end

  def docs_edit_url(resource)
    "#{DOCS_REPO}/edit/master/#{docs_relative_path(resource)}"
  end

  def docs_last_updated(resource)
    date = `git -C "#{File.join(app.root, 'docs')}" log -1 --format=%cs -- "#{docs_relative_path(resource)}" 2>/dev/null`.strip
    date.empty? ? File.mtime(resource.source_file).strftime('%Y-%m-%d') : date
  end
end
