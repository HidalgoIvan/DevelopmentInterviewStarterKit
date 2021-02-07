class Api::PeopleController < Api::BaseController
  respond_to :json

  def people
    respond_with({ data: "Hello from the backend!" })
  end
end
