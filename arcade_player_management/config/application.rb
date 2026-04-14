require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module ArcadePlayerManagement
  class Application < Rails::Application
    config.load_defaults 8.0
    config.generators.system_tests = nil
    config.autoload_paths << Rails.root.join("app/services").to_s
    config.eager_load_paths << Rails.root.join("app/services").to_s
    config.api_only = true
  end
end
