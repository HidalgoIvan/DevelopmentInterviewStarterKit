=begin
Things I'd like to add in the future:

  - Request exception handling
  - Pagination for the people endpoint
  - A more in-depth duplicate algorithm (It currently does a substring search with names and email addresses)
  - More efficient duplicate implementation (Maybe do a comparison on a database level with %name% queries, or not querying all of the data since 
    I'm only using a fraction of it)

=end
class Api::PeopleController < Api::BaseController
  respond_to :json
  require 'net/http'    

  # Get the first 15 people from the salesloft get_v2_people_json API
  def people
    respond_with(make_get_request("https://api.salesloft.com/v2/people.json?per_page=15"))
  end

  # Find possible duplicates for a person in the database
  def duplicates
    # The person we'll search duplicates for
    originalPerson = JSON.parse(make_get_request("https://api.salesloft.com/v2/people/#{params[:personId]}.json"))["data"]

    # Query an arbitrary number of people (300) to search for possible duplicates
    peopleToSearch = []
    peopleToSearch = peopleToSearch + JSON.parse(make_get_request("https://api.salesloft.com/v2/people.json?per_page=100&page=1"))["data"]
    peopleToSearch = peopleToSearch + JSON.parse(make_get_request("https://api.salesloft.com/v2/people.json?per_page=100&page=2"))["data"]
    peopleToSearch = peopleToSearch + JSON.parse(make_get_request("https://api.salesloft.com/v2/people.json?per_page=100&page=3"))["data"]

    result = { 
      metadata: 
      {
        recordsSearched: peopleToSearch.count,
        originalPerson: originalPerson
      },
      data: []
    }

    # Compare each person to the original using the name and email address
    peopleToSearch.each { |personToSearch|
      if (matches_name(originalPerson, personToSearch) || matches_mail(originalPerson, personToSearch))
        result[:data] << personToSearch
      end
    }

    result[:metadata][:duplicatesFound] = result[:data].count

    respond_with(result)
  end

  # Checks if the first or last name of person 1 is a substring of person 2's name
  def matches_name(person1, person2)
    person2Name = person2["display_name"].to_s.downcase
    return person2Name.include?(person1["first_name"].downcase) || person2Name.include?(person1["last_name"].downcase)
  end

  # Checks if the first part of person1's mail is a substring of the first part of person 2's mail
  def matches_mail(person1, person2)
    person1mail = person1["email_address"].split('@')[0].downcase
    person2mail = person2["email_address"].split('@')[0].downcase
    return person2mail.include?(person1mail)
  end

  # Helper method that makes a GET request using the token from .env and returns the body of the result
  def make_get_request(url = "")
    uri = URI(url)
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{ENV['SALESLOFT_APPLICATION_SECRET']}"

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    response = http.request(request)

    return response.body;
  end
end
