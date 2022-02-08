require "test_helper"
require "spacefinder_envars"

class SpacefinderGetFileEnvarTest < ActiveSupport::TestCase
  setup do
    ENV.delete('FOO')
    ENV.delete('FOO_FILE')
  end

  test "raises KeyError for missing envar value" do
    err = assert_raises KeyError do
       Spacefinder.get_file_envar("FOO")
    end
    assert_equal \
      "Failed to load environment value FOO: neither FOO or FOO_FILE exist in" \
      " the environment and no default is provided", err.to_s
  end

  test "returns default value for missing envar value" do
    assert_nil Spacefinder.get_file_envar("FOO", nil)
    assert_equal 'example', \
                  Spacefinder.get_file_envar("FOO", 'example')
  end

  test "returns default value from block" do
    value = Spacefinder.get_file_envar("FOO") do 'example' end
    assert_equal 'example', value
    assert_equal 'example', (Spacefinder.get_file_envar("FOO") { 'example' })
  end

  test "returns default value from lambda" do
    calc_default = lambda { 'example' }
    assert_equal 'example', Spacefinder.get_file_envar("FOO", calc_default)
  end

  test "block can throw the default not found error" do
    calc_default = lambda do |name, err|
      return 'foo-default' if name == 'FOO'
      raise err
    end
    assert_equal 'foo-default', Spacefinder.get_file_envar("FOO", calc_default)

    err = assert_raises KeyError do
      Spacefinder.get_file_envar("BAR", calc_default)
   end
   assert_equal \
     "Failed to load environment value BAR: neither BAR or BAR_FILE exist in" \
     " the environment and no default is provided", err.to_s
  end

  test "raises if default and block are specified" do
    assert_raises ArgumentError do
      Spacefinder.get_file_envar("FOO", 'a') do 'b' end
    end
  end

  test "returns environment value for present envar" do
    ENV['FOO'] = 'value-in-envar'
    assert_equal Spacefinder.get_file_envar("FOO"), 'value-in-envar'
  end

  test "returns file value for present _FILE envar" do
    file = Tempfile.new('test')
    IO.write(file.path, "value-in-file\n")
    ENV['FOO_FILE'] = file.path
    assert_equal Spacefinder.get_file_envar("FOO"), "value-in-file\n"
  end

  test "returns environment value when FOO and FOO_FILE are both set" do
    file = Tempfile.new('test')
    IO.write(file.path, "value-in-file\n")
    ENV['FOO_FILE'] = file.path
    ENV['FOO'] = 'value-in-envar'
    assert_equal Spacefinder.get_file_envar("FOO"), "value-in-envar"
  end

  test "raises when FOO_FILE points to missing file" do
    ENV['FOO_FILE'] = '/does/not/exist'
    err = assert_raises KeyError do
      Spacefinder.get_file_envar("FOO")
    end
    assert_includes err.to_s,
      "Failed to load environment value FOO from file "\
      "[FOO_FILE=/does/not/exist]:"
    assert_includes err.to_s, "No such file or directory"
    assert_includes err.to_s, "/does/not/exist"
  end
end
