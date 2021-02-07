class Api::PeopleController < Api::BaseController
  respond_to :json
  require 'net/http'    

  def people
    uri = URI("https://api.salesloft.com/v2/people.json?per_page=15")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{ENV['SALESLOFT_APPLICATION_SECRET']}"

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    response = http.request(request)

    respond_with(response.body)
  end
end
