class Beverage
  include Mongoid::Document
  field :name, :type => String
  
  embeds_many :beverage_preferences
end
