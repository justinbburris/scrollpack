class DeckScroll < ActiveRecord::Base
  attr_accessible :count, :deck_id, :scroll_id

  belongs_to :deck
  belongs_to :scroll

  def as_json(options={})
    {
      id: self.scroll_id,
      count: self.count
    }
  end
end
