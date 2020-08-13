# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment', __FILE__)
# require ::File.expand_path('config/environment', __dir__)
run Rails.application
