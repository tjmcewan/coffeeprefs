class User
  include Mongoid::Document
  field :name, :type => String
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  embeds_many :beverage_preferences
  embedded_in :organisation

end
