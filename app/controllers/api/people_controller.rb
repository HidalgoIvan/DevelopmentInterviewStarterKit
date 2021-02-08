class Api::PeopleController < Api::BaseController
  respond_to :json
  require 'net/http'    

  # Get the first 15 people from the salesloft get_v2_people_json API
  def people
    uri = URI("https://api.salesloft.com/v2/people.json?per_page=15")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{ENV['SALESLOFT_APPLICATION_SECRET']}"

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    response = http.request(request)

    respond_with(response.body)
  end

  def duplicates
    puts "I will now search for the person with id: " + params[:personId]
    respond_with({result: "dummy"})
  end
end
