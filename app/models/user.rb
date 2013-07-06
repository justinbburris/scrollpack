class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  has_many :decks
  has_many :deck_favorites
  has_many :favorites, through: :deck_favorites, source: :deck

  def user_json(options={})
    resp = self.as_json(only: :id,
                        include: {
                          favorites: {only: :id }
                        })

    resp[:favorites] = resp[:favorites].map {|deck| deck['id']}

    resp
  end

end
