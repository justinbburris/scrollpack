require 'nokogiri'
require 'digest/md5'
require_relative 'scroll_parser'

class Ark
  @@URL = 'http://www.scrollsguide.com/wiki/index.php/Scrolls_Database'
  # this is a real loose selector, they don't give much else to go on
  @@TABLE_CLASS = 'sortable'

  def initialize(scroll_model, parsed_registry, force=false, url=@@URL)
    @url = url
    @force = force
    @scroll_model_class = scroll_model
    @parsed_registry_class = parsed_registry
  end

  def build
    # so we pull down the html
    response = HTTParty.get(@url)
    dom = Nokogiri::HTML(response)

    # Just a table that is sortable, it's all we have
    table = dom.css("table.#{@@TABLE_CLASS}")
    checksum_registry = @parsed_registry_class.new(table)

    saved_record = checksum_registry.last_in
    if saved_record and !@force
      puts 'Already parsed'
    else
      scrolls = ScrollParser.new(table).parse

      @scroll_model_class.transaction do
        scrolls.each { |scroll| @scroll_model_class.create!(scroll) }
        checksum_registry.add unless @force
      end
    end
  end
end
