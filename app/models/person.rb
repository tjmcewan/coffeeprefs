class Person
  include Mongoid::Document
  field :name, :type => String
  belongs_to :organisation
end

