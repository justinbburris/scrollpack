require 'digest/md5'
require 'nokogiri'

class ParserChecksumRegistry
  attr_reader :checksum, :html_data

  @@TABLE_CLASS = 'sortable'

  def initialize(response)
    dom = Nokogiri::HTML(response)

    @html_data = dom.css("table.#{@@TABLE_CLASS}")
  end

  def last_in
    @checksum = Digest::MD5.hexdigest(@html_data.to_s)

    return ParserChecksum.last_checksum(@checksum)
  end

  def add
    ParserChecksum.create(checksum: @checksum)
  end

  def self.destroy_all
    ParserChecksum.destroy_all
  end
end
