class Deck < ActiveRecord::Base
  attr_accessible :name, :views

  MIN_DECK_SIZE = 50
  MAX_SCROLLS = 3

  belongs_to :user

  has_many :deck_scrolls
  has_many :scrolls, through: :deck_scrolls
  has_many :deck_favorites
end
