class BeveragePreferencesController < InheritedResources::Base
  actions :all, :except => [:create, :update]
  
  def create
    unless @beverage = Beverage.where(:name => params[:beverage_name])
      @beverage = Beverage.create(:name => params[:beverage_name])
    end

    render :json => BeveragePreference.create(:beverage => @beverage, 
                      :user => current_user, :preferences => params[:preferences])
  end
  
  def update
  end
end
