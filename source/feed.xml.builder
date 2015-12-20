xml.instruct! :xml, :version => '1.0'
xml.rss :version => "2.0",  'xmlns:atom' => "http://www.w3.org/2005/Atom" do
  xml.channel do
    xml.title "Blog - Padrino Ruby Web Framework"
    xml.description "Blog - Padrino Ruby Web Framework"
    xml.link "http://padrinorb.com/"
    site_url = "http://padrinorb.com/"
    blog.articles[0..5].each do |article|
      xml.item do
        xml.title article.title
        xml.link URI.join(site_url, article.url)
        xml.description article.body
        xml.pubDate article.date.to_date.rfc822
        xml.guid URI.join(site_url, article.url)
      end
    end
  end
end
