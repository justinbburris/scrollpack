require 'model/ark/ark.rb'

namespace :ark do
  desc "Scrape page and save to tmp"
  task :scrape => :environment do
    Ark.new(Scroll, ParserChecksumRegistry).build
  end
end
