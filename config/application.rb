require_relative 'boot'

require 'rails/all'
require_relative '../lib/spacefinder_envars'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
ActiveSupport::Deprecation.behavior = :silence
Bundler.require(*Rails.groups)

module Spacefinder
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    # config.active_record.raise_in_transactional_callbacks = true

    config.assets.paths << Rails.root.join("app", "assets", "fonts", "templates")
  end
end
