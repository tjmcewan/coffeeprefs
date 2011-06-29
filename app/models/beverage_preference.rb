class BeveragePreference
  include Mongoid::Document
  field :preference, :type => String
  
  embedded_in :user
  embedded_in :beverage
end
