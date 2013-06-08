class CreateDeckScrolls < ActiveRecord::Migration
  def change
    create_table :deck_scrolls do |t|
      t.integer :scroll_id
      t.integer :deck_id
      t.integer :count

      t.timestamps
    end
  end
end
