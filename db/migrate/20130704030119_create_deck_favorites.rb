class CreateDeckFavorites < ActiveRecord::Migration
  def change
    create_table :deck_favorites do |t|
      t.integer :user_id
      t.integer :deck_id

      t.timestamps
    end
  end
end
