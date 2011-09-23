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
    @organisations = Organisation.all
    @organisation = Organisation.find(params[:organisation_id])

    respond_to do |format|
      format.json { render :json => @organisation.people.to_json}
      format.html { render :action => "index" }
    end
  end

  def sign_in
    @person = Person.where(:name => params[:name]).first
    respond_to do |format|
      format.json{ render :json => @person.to_json}
    end
  end
end

