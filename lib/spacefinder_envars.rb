module Spacefinder
  NOT_SPECIFIED = Object.new
  private_constant :NOT_SPECIFIED

  # Get an environment variable that may be specified as a file.
  #
  # For an envar_name `FOO`, if `FOO` exists in the environment, then its value
  # is returned. Otherwise, if `FOO_FILE` exists in the environment then the
  # contents of that file is returned.
  #
  # This pattern is commonly used to configure Docker containers.
  def self.get_file_envar(envar_name, default = NOT_SPECIFIED, &default_block)
    if default != NOT_SPECIFIED and default_block
      raise ArgumentError.new "default value and a block cannot both be specified"
    end
    if default.kind_of? Proc
      default_block = default
      default = NOT_SPECIFIED
    end
    not_found_error = nil

    envar_file = "#{envar_name}_FILE"
    err_prefix = "Failed to load environment value #{envar_name}"
    if ENV.key?(envar_name)
      return ENV[envar_name]
    elsif ENV.key?(envar_file) and ENV[envar_file]
      begin
        return IO.read(ENV[envar_file])
      rescue Errno::ENOENT => error
        not_found_error = KeyError.new \
          "#{err_prefix} from file [#{envar_file}=#{ENV[envar_file]}]: "\
          "#{error}"
      end
    end
    return default unless default == NOT_SPECIFIED

    not_found_error = KeyError.new \
      "#{err_prefix}: neither #{envar_name} or #{envar_file} exist in the " \
      "environment and no default is provided" unless not_found_error

    if default_block
      args = [envar_name, not_found_error].slice(0, default_block.arity)
      return default_block.call(*args)
    end
    raise not_found_error
  end
end
