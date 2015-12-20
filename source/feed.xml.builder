xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  site_url = "http://padrinorb.com/"
  xml.title "Blog - Padrino Ruby Web Framework"
  xml.subtitle "Padrino is a Ruby web framework built upon the Sinatra web library - get the latest news"
  blog.articles.each do |article|
    xml.entry do
      xml.title article.title
      xml.link "rel" => "alternate", "href" => URI.join(site_url, article.url)
      xml.id URI.join(site_url, article.url)
      xml.published article.date.to_time.iso8601
      xml.updated File.mtime(article.source_file).iso8601
      xml.author article.data.author
      xml.content article.body, "type" => "html"
    end
  end
end
