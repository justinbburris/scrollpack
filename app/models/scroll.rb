class Scroll < ActiveRecord::Base
  attr_accessible :ability, :attack, :cost, :countdown, :flavor_text, :health, :name, :rarity, :resource_type, :scroll_id, :subtype, :scroll_type

  TYPE_CREATURE = 'Creature'
  TYPE_SPELL    = 'Spell'

  SUBTYPE_GRAVELOCK = 'Gravelock'

  RARITY_COMMON = 'Common'
  RARITY_RARE   = 'Rare'

  RESOURCE_ENERGY = 'Energy'
  RESOURCE_GROWTH = 'Growth'
end
