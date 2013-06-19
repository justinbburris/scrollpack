class Deck < ActiveRecord::Base
  attr_accessible :name

  MIN_DECK_SIZE = 50
  MAX_SCROLLS = 3

  has_many :deck_scrolls
  has_many :scrolls, through: :deck_scrolls

  def as_json(options={})
    self.attributes
      .slice('id', 'name')
      .merge(maxScrolls: MAX_SCROLLS, minDeckSize: MIN_DECK_SIZE, scrolls: self.deck_scrolls.as_json)
  end
end
