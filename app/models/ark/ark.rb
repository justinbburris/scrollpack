require 'digest/md5'
require 'fileutils'

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
        scrolls.each { |scroll| @scroll_model_class.create!(scroll) } unless @dev
        checksum_registry.add unless (@force or @dev)
      end
    end

    # fetch_images('http://theyseemescrollin.com/images/scrolls')

  end

  def fetch_images(image_url)
    @scroll_model_class.all.each do |scroll|
      # so we pull down the html
      response = HTTParty.get("#{image_url}/#{scroll.url_name}.png")

      create_image("app/assets/images/scrolls/#{scroll.scroll_id}_#{scroll.url_name}.png", response)
    end
  end

  def flood
    @scroll_model_class.destroy_all
    @parsed_registry_class.destroy_all
  end

  private

  def create_image(path, image)
    dir = File.dirname(path)

    unless File.directory?(dir)
      FileUtils.mkdir_p(dir)
    end

    unless File.exist?(path)
      puts "Saving Image : #{path}"
      File.open(path, 'wb') do |f|
        f << image
      end
    end
    
  end
end
