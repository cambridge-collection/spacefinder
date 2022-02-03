
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Get a hash containing both direct and nested attributes of a model object.
  #
  # The nested attributes are those marked with `accepts_nested_attributes_for`.
  def deep_attributes(model)
    model.attributes.merge nested_attributes(model)
  end

  private

  # Get a hash of the nested attributes of a model object.
  def nested_attributes(model)
    model.nested_attributes_options.keys.collect { |attr_name|
      attr_value = model.send(attr_name)
      [
        "#{attr_name}_attributes",
        attr_value.respond_to?('collect') ?
          attr_value.collect {|x| deep_attributes x} :
          deep_attributes(attr_value)
      ]
    }.to_h
  end
end
