class AjaxController < ApplicationController
  def page_description
    url_string = params.require(:url)
    url = URI.parse(url_string)
    url = URI.parse('http://' + url_string) unless url.scheme
    page = Nokogiri::HTML(open(url))
    sites = ['www.youtube.com', 'youtube.com']
    if sites.include?(url.host)
      data = {
        url: url.to_s,
        domain: url.host,
        title: 'Видео Youtube',
        description: ''
      }
    else
      data = {
        url: url.to_s,
        domain: url.host,
        title: page.css('head title').try(:text),
        images: page.css('img').map(){|i| i.attributes['src'].try(:value)}.compact.uniq,
        description: page.css('head meta[name=description]')
        .first.try(:attributes).try(:[], 'content').try(:value)
      }
    end
    pp data
    render json: data
  rescue Exception => e
    #pp e
    render nothing: true, status: :no_content
  end
end
