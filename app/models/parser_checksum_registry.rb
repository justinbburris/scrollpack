require 'digest/md5'

class ParserChecksumRegistry
  attr_reader :checksum

  def initialize(html_data)
    @html_data = html_data
  end

  def last_in
    @checksum = Digest::MD5.hexdigest(@html_data.to_s)

    return ParserChecksum.last_checksum(@checksum)
  end

  def add
    ParserChecksum.create(checksum: @checksum)
  end
end
