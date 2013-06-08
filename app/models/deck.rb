class Deck < ActiveRecord::Base
  attr_accessible :name

  has_many :deck_scrolls
  has_many :scrolls, through: :deck_scrolls
end
