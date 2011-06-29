class Organisation
  include Mongoid::Document
  field :name, :type => String
  embeds_many :users
end
