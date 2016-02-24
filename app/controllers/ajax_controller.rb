class AjaxController < ApplicationController
  skip_before_action :require_login,
    only: :get_cities

  def page_description
    url_string = params.require(:url)
    url = URI.parse(url_string)
    url = URI.parse('http://' + url_string) unless url.scheme
    page = Nokogiri::HTML(open(url))
    sites = ['www.youtube.com', 'youtube.com']
    if sites.include?(url.host)
      page = Nokogiri::HTML(open(url), nil, 'UTF-8')
    end
    data = {
      url: url.to_s,
      domain: url.host,
      title: page.css('head title').try(:text),
      images: page.css('img').map(){|i| i.attributes['src'].try(:value)}.compact.uniq,
      description: page.css('head meta[name=description]')
      .first.try(:attributes).try(:[], 'content').try(:value)
    }
    # end
    pp data
    render json: data
  rescue Exception => e
    pp e
    render nothing: true, status: :no_content
  end

  def get_cities
    uri = URI("https://api.vk.com/method/database.getCities?country_id=1&v=5.45&count=20")
    ar = URI.decode_www_form(uri.query) << ["q", params[:term]]
    uri.query = URI.encode_www_form(ar)
    #p uri
    response = Net::HTTP.get_response(uri)
    data = ActiveSupport::JSON.decode(response.body)
    render json: data['response']['items'].map{|c|
      if c['region']
        name = c['title'] + ' ('+ c['region'] + ' ' + c['area'].to_s + ')'
      else
        name = c['title']
      end
      {id: c['id'], name: name}
    }
  end
end
