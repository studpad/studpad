class AjaxController < ApplicationController
  def page_description
    url_string = params.require(:url)
    url = URI.parse(url_string)
    url = URI.parse('http://' + url_string) unless url.scheme
    page = Nokogiri::HTML(open(url), nil, 'UTF-8')
    render json: {
      url: url.to_s,
      domain: url.host,
      title: page.css('title').try(:text),
      description: page.css('meta[name=description]')
      .first.try(:attributes).try(:[], 'content').try(:value)
    }
  rescue
    render nothing: true, status: :no_content
  end
end
