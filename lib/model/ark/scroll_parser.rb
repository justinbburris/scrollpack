require 'nokogiri'

class ScrollParser

  @@POSITION_ATTR_MAP = [
    :scroll_id,
    :name,
    :scroll_type,
    :subtype,
    :rarity,
    :cost,
    :attack,
    :countdown,
    :health,
    :ability
  ]

  def initialize(table)
    @table = table
  end

  def parse
    scrolls = []
    @table.css('tr').drop(1).each do |tr|
      attrs = {}
      tr.css('td').each_with_index do |td, index|
        attr_name = @@POSITION_ATTR_MAP[index]
        attrs[attr_name] = td.text.strip!
      end
      scrolls << attrs
    end
    scrolls
  end
end
