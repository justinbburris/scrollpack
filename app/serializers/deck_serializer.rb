class DeckSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :views, :maxScrolls, :minDeckSize, :scrolls, :favorites, :resources, :created_at

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

  def resources
    resources = object.scrolls.inject({}) do |hsh, scroll|
      hsh[scroll[:resource_type]] ||= 0
      hsh[scroll[:resource_type]] += 1

      hsh
    end

    resources.map do |key, value|
      {
        name: key,
        count: value
      }
    end
  end

end
