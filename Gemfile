source 'https://rubygems.org'

# to satisfy the gods
gem 'nio4r', '~> 2.5'
gem 'tzinfo-data'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
# gem 'rails', '4.2.3'
gem 'rails', '~> 6'
gem 'rake', '~> 13'
# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5'
#gem 'sass-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '~> 1.3'
# Use CoffeeScript for .coffee assets and views
#gem 'coffee-rails', '~> 4.1.0'
gem 'railties', '~> 6'
gem 'coffee-rails', '~> 5'

# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 2', group: :doc

gem 'puma'
gem 'smarter_csv'
gem 'acts-as-taggable-on'
gem 'filterrific'
gem 'devise', '~> 4.8'
gem 'omniauth', '~> 2.0'
gem 'omniauth-rails_csrf_protection'
gem 'ruby-saml', '~> 1.9'
gem "rexml", "~> 3.2"
gem 'omniauth-saml'
gem "paranoia", "~> 2.0"
gem 'paperclip'
gem 'nested_form'
gem 'kaminari'
gem 'cancancan'
gem 'rolify'
gem 'geokit-rails'
gem 'search_cop'
gem 'concurrent-ruby', '~> 1.1'
gem "health_check", "~> 3.1"

group :development, :test do
  gem 'listen'
  gem 'ruby-debug-ide'
  gem 'debase'

  # Ruby language server used by vscode ruby extensions
  gem 'solargraph'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 4'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'mini_racer'
  gem 'dotenv-rails'

  gem 'pry'

  gem "bullet"
  gem "lol_dba"
end

group :production do
  gem 'rails_12factor'
  gem "passenger", "~> 6", require: "phusion_passenger/rack_handler"
end
