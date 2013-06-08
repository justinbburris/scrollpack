# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

scrolls = Scroll.create([
                         {
                          name: 'Gravelock Elder',
                          scroll_id: 1,
                          scroll_type: Scroll::TYPE_CREATURE,
                          subtype: Scroll::SUBTYPE_GRAVELOCK,
                          rarity: Scroll:: RARITY_RARE,
                          cost: 5,
                          resource_type: Scroll::RESOURCE_ENERGY,
                          attack: 3,
                          countdown: 2,
                          health: 5,
                          ability: 'Ranged attack; Other Gravelock creatures you control gain +1 Attack and +1 Health while Gravelock Elder is in play.'
                        },
                        {
                          name: 'Hymn',
                          scroll_id: 18,
                          scroll_type: Scroll::TYPE_SPELL,
                          rarity: Scroll:: RARITY_COMMON,
                          cost: 1,
                          resource_type: Scroll::RESOURCE_GROWTH,
                          attack: nil,
                          countdown: nil,
                          health: nil,
                          ability: 'Heal target unit by 3 Health.'
                         }
                        ])
