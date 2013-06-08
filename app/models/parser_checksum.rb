class ParserChecksum < ActiveRecord::Base
  attr_accessible :checksum, :when

  def self.last_checksum(checksum)
    order("created_at DESC").find_by_checksum(checksum)
  end
end
