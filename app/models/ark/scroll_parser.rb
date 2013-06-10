class Ark::ScrollParser

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

  @@COST_TYPE = {
    'G' => Scroll::RESOURCE_GROWTH,
    'E' => Scroll::RESOURCE_ENERGY,
    'O' => Scroll::RESOURCE_ORDER
  }

  @@RARITY_TYPE = {
    'R' => Scroll::RARITY_RARE,
    'C' => Scroll::RARITY_COMMON,
    'U' => Scroll::RARITY_UNCOMMON
  }

  def initialize(table)
    @table = table
  end

  def parse
    scrolls = []

    @table.css('tr').drop(1).each do |tr|

      # The only way we can know these scrolls aren't in the game anymore is by the style
      # attribute on the table row :[
      style = tr.css('td').first.attributes['style']
      next if style != nil && style.value == 'background: red; color: white;'

      scrolls << massage_values(tr)

    end

    scrolls
  end

  def massage_values(element)
    attrs = {}
    element.css('td').each_with_index do |cell, index|
      cell = cell.text.strip
      attr_name = @@POSITION_ATTR_MAP[index]

      if attr_name == :cost
        type, cell = cell[0].upcase, cell[1..cell.length]
        attrs[:resource_type] = @@COST_TYPE[type]
      elsif attr_name == :rarity
        cell = @@RARITY_TYPE[cell]
      end

      attrs[attr_name] = cell
    end

    attrs
  end
end
