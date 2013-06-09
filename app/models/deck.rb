class Deck < ActiveRecord::Base
  attr_accessible :name

  has_many :deck_scrolls
  has_many :scrolls, through: :deck_scrolls

  def as_json(options={})
    self.attributes.slice('id', 'name').merge(scrolls: self.scrolls.map(&:id))
  end
end
