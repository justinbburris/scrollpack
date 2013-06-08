require 'digest/md5'

class Ark::Ark
  @@URL = 'http://www.scrollsguide.com/wiki/index.php/Scrolls_Database'
  # this is a real loose selector, they don't give much else to go on

  def initialize(scroll_model, parsed_registry, force=false, dev=false, url=@@URL)
    @url = url
    @force = force
    @dev = dev
    @scroll_model_class = scroll_model
    @parsed_registry_class = parsed_registry
  end

  def build
    # so we pull down the html
    response = HTTParty.get(@url)
    checksum_registry = @parsed_registry_class.new(response)

    saved_record = checksum_registry.last_in
    if saved_record and !@force
      puts 'Already parsed'
    else
      scrolls = ScrollParser.new(checksum_registry.html_data).parse

      @scroll_model_class.transaction do
        scrolls.each { |scroll| @scroll_model_class.create!(scroll) }
        checksum_registry.add unless (@force or @dev)
      end
    end
  end

  def flood
    @scroll_model_class.destroy_all
    @parsed_registry_class.destroy_all
  end
end
