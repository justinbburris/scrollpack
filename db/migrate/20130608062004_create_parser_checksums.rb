class CreateParserChecksums < ActiveRecord::Migration
  def change
    create_table :parser_checksums do |t|
      t.string :checksum

      t.timestamps
    end
  end
end
