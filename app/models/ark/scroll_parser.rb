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
    'G' => Scroll::RESOURCE[:GROWTH],
    'E' => Scroll::RESOURCE[:ENERGY],
    'O' => Scroll::RESOURCE[:ORDER]
  }

  def initialize(table)
    @table = table
  end

  def parse
    scrolls = []
    @table.css('tr').drop(1).each do |tr|
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
        puts type, cell
        attrs[:resource_type] = @@COST_TYPE[type]
      end

      attrs[attr_name] = cell
    end

    attrs
  end
end
