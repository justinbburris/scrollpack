class AddViewsToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :views, :integer, default: 0
  end
end
