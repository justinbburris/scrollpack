namespace :ark do
  desc "Scrape page and save to tmp"
  task :raider => :environment do
    Ark::Ark.new(Scroll, ParserChecksumRegistry).build
  end

  desc "Scrape page do not save"
  task :dev => :environment do
    Ark::Ark.new(Scroll, ParserChecksumRegistry, false, true).build
  end

  desc "Scrape page force run and save"
  task :luke => :environment do
    Ark::Ark.new(Scroll, ParserChecksumRegistry, true).build
  end

  desc "Clear all scrolls/checksums"
  task :noah => :environment do
    Ark::Ark.new(Scroll, ParserChecksumRegistry).flood
  end
end
