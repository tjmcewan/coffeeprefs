class PeopleController < InheritedResources::Base
  respond_to :html, :xml, :json
  actions :all, :except => [:create, :update]

  def create
    @organisation = Organisation.find(params[:organisationId])

    @organisation.people <<  Person.new(params)
    @organisation.save
    @person = @organisation.people.last

    render :json => @person.to_json
  end

  def update
    @organisation = Organisation.find(params[:organisationId])
    @person = @organisation.people.find(params[:id])
    @person.update_attributes(params[:person].merge(params))


    render :json => @person.to_json
  end

  def index
    @organisation = Organisation.find(params[:organisation_id])

    render :json => @organisation.people.to_json
  end
end

