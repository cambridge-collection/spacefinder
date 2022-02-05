#!/bin/bash
set -euo pipefail
shopt -s inherit_errexit

if [ "${SPACEFINDER_DB_PREPARE:-true}" != true ]; then
    echo "Skipping DB preparation."
    exit
fi
echo "Creating DB or running pending migrations ..."
su app -c 'cd /home/app/webapp && env RAILS_ENV=production bin/rake db:prepare'
