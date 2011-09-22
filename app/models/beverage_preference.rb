class BeveragePreference
  include Mongoid::Document
  field :preference, :type => String

  embedded_in :person
end
