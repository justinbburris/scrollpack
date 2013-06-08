class CreateScrolls < ActiveRecord::Migration
  def change
    create_table :scrolls do |t|
      t.string :name
      t.integer :scroll_id
      t.string :scroll_type
      t.string :subtype
      t.string :rarity
      t.integer :cost
      t.string :resource_type
      t.integer :attack
      t.integer :countdown
      t.integer :health
      t.text :ability
      t.text :flavor_text

      t.timestamps
    end
  end
end
