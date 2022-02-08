#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /spacefinder/tmp/pids/server.pid

# Generate a random secret key if one is not set, otherwise running the app will
# fail.
if [[ "${SECRET_KEY_BASE:-}" = "" ]]; then
    echo "\
WARNING: SECRET_KEY_BASE environment variable is not set, a random value is \
being used which will change on every launch, invalidating user sessions." 1>&2
    export SECRET_KEY_BASE="$(head --bytes 1024 /dev/urandom | sha256sum | cut -d ' ' -f 1)"
fi

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
