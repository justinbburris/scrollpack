class DeckFavorite < ActiveRecord::Base
  attr_accessible :deck_id, :user_id

  belongs_to :user
  belongs_to :deck
end
