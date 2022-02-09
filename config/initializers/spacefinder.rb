# Spacefinder application configuration

# The API key used when loading the Google Maps API
Rails.application.config.google_maps_api_key = Spacefinder.get_file_envar(
  'SPACEFINDER_GOOGLE_MAPS_API_KEY', '')
