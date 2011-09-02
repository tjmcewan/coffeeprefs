class Person
  include Mongoid::Document
  field :name, :type => String
  embedded_in :organisation
end

