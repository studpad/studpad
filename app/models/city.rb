class City < ActiveRecord::Base
  has_many :posts
  has_many :users

  def self.load_external_data(city_id)
    c = find_by_id city_id
    if c
      c
    else
      uri = URI("https://api.vk.com/method/database.getCitiesById?v=5.45")
      ar = URI.decode_www_form(uri.query) << ["city_ids", city_id ]
      uri.query = URI.encode_www_form(ar)
      #p uri
      response = Net::HTTP.get_response(uri)
      data = ActiveSupport::JSON.decode(response.body)
      c = City.new(id: city_id,
        name: data['response'].first['title'] )
      c.save
      c
    end
  end

end
