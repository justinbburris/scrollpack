class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name, :views, :maxScrolls, :minDeckSize, :scrolls, :favorites

  def maxScrolls
    Deck::MAX_SCROLLS
  end

  def minDeckSize
    Deck::MIN_DECK_SIZE
  end

  def scrolls
    object.deck_scrolls.as_json
  end

  def favorites
    object.deck_favorites.count
  end

end
