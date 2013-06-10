class Scroll < ActiveRecord::Base
  attr_accessible :ability, :attack, :cost, :countdown, :flavor_text, :health, :name, :rarity, :resource_type, :scroll_id, :subtype, :scroll_type

  TYPE_CREATURE     = 'Creature'
  TYPE_ENCHANTMENT  = 'Enchantment'
  TYPE_SPELL        = 'Spell'
  TYPE_STRUCTURE    = 'Structure'

  SUBTYPE_ARTILLERY = 'Artillery'
  SUBTYPE_AUTOMATON = 'Automaton'
  SUBTYPE_BEAST     = 'Beast'
  SUBTYPE_BUNNY     = 'Bunny'
  SUBTYPE_ELDER     = 'Elder'
  SUBTYPE_GRAVELOCK = 'Gravelock'
  SUBTYPE_HUMAN     = 'Human'
  SUBTYPE_KINFOLK   = 'Kinfolk'
  SUBTYPE_KNIGHT    = 'Knight'
  SUBTYPE_RAT       = 'Rat'
  SUBTYPE_SOLDIER   = 'Soldier'
  SUBTYPE_TRIBESMAN = 'Tribesman'
  SUBTYPE_MEMORIAL  = 'Memorial'
  SUBTYPE_TOTEM     = 'Totem'
  SUBTYPE_VATTR     = 'Vattr'
  SUBTYPE_WALL      = 'Wall'
  SUBTYPE_WOLF      = 'Wolf'

  RARITY_COMMON     = 'Common'
  RARITY_UNCOMMON   = 'Uncommon'
  RARITY_RARE       = 'Rare'

  RESOURCE_ENERGY   = 'Energy'
  RESOURCE_GROWTH   = 'Growth'
  RESOURCE_ORDER    = 'Order'

  def as_json(options={})
    self.attributes.merge(scrollImage: self.scrollImage)
  end

  def url_name
    self.name.gsub(' ', '_')
  end

  def scrollImage
    ActionController::Base.helpers.asset_path("scrolls/#{scroll_id}_#{url_name}.png")
  end

end
