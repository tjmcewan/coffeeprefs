class OrganisationsController < InheritedResources::Base
  respond_to :html, :xml, :json

  def create
    @organisation = Organisation.new(params)
    create!
  end
end
