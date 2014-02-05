source 'https://rubygems.org'

gem 'rails', '~> 3.2.17'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

# gem 'pg'
gem 'mysql2'
gem 'bower-rails', '~> 0.4.4'
gem 'devise'
gem 'bourbon'
gem 'jquery-rails'
gem 'rails_config'
gem 'bcrypt-ruby', :require => 'bcrypt'
gem 'httparty'
gem 'liquid'
gem 'paper_trail', '~> 3.0.0'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails'
  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  gem 'execjs'
  # gem 'therubyracer', :platforms => :ruby

  gem 'zurb-foundation', '~> 4.2.2'
  gem 'entypo-rails'
  gem 'uglifier', '>= 1.0.3'
end

group :production do
  gem 'unicorn'
end

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'
group :test, :development do
  gem 'rspec-rails', '~> 2.0'
  gem 'factory_girl_rails'
  gem 'sqlite3'
end

group :development do
  gem 'debugger'
  gem 'thin'
  gem 'better_errors'
  gem 'binding_of_caller'
  # Deploy with Capistrano
  gem 'capistrano'
  gem 'rvm-capistrano'
end
