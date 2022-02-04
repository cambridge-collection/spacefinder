# Whether to run apt-get upgrade on the base passenger image.
# Passenger recommends doing an apt upgrade:
# https://github.com/phusion/passenger-docker#upgrading-the-operating-system-inside-the-container
ARG UPGRADE_PACKAGES="true"
ARG PASSENGER_IMAGE_TAG="2.1.0"

ARG _RAILS_ROOT="/home/app/webapp"
ARG _BUNDLER_PATH="/home/app/spacefinder-gems"
ARG _BUNDLER_CONF="/home/app/.bundle/config"


# The passenger image with system dependencies needed to run the app
FROM phusion/passenger-ruby30:${PASSENGER_IMAGE_TAG} as runtime-dependencies-base
ARG UPGRADE_PACKAGES
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && if [ "$UPGRADE_PACKAGES" = true ]; then echo "Upgrading OS packages..."; apt-get upgrade -y -o Dpkg::Options::=--force-confold; fi \
    && apt-get -y install --no-install-recommends \
    # required by paperclip gem - it resizes uploaded images with imagemagick
    # commandline tools.
    graphicsmagick-imagemagick-compat \
    # required by mimemagic gem
    shared-mime-info \
    && rm -rf /var/lib/apt/lists/*


# Collect the gem dependencies at $_BUNDLER_PATH
FROM runtime-dependencies-base as bundler-deps
ARG _RAILS_ROOT
ARG _BUNDLER_PATH
COPY --chown=app:app Gemfile Gemfile.lock $_RAILS_ROOT/
WORKDIR $_RAILS_ROOT
USER app
RUN bundle config --global path $_BUNDLER_PATH \
    && bundle config --global deployment true \
    && bundle install --jobs 4


# Copy/compile the static web assets under ./public/assets
FROM runtime-dependencies-base as precompiled-public-assets
ARG _RAILS_ROOT
ARG _BUNDLER_PATH
ARG _BUNDLER_CONF
COPY --from=bundler-deps --chown=app:app $_BUNDLER_PATH $_BUNDLER_PATH
COPY --from=bundler-deps --chown=app:app $_BUNDLER_CONF $_BUNDLER_CONF
COPY --chown=app:app . $_RAILS_ROOT/
USER app
WORKDIR $_RAILS_ROOT
RUN SPACEFINDER_DATABASE_PASSWORD='' DISABLE_FILE_WATCHER=1 \
    bundle exec rake assets:clobber assets:precompile tmp:clear


# The actual image used to run the app
FROM runtime-dependencies-base as production
ARG _RAILS_ROOT
ARG _BUNDLER_PATH
ARG _BUNDLER_CONF
COPY --from=bundler-deps --chown=app:app $_BUNDLER_PATH $_BUNDLER_PATH
COPY --from=bundler-deps --chown=app:app $_BUNDLER_CONF $_BUNDLER_CONF
COPY --chown=app:app . $_RAILS_ROOT/
COPY --from=precompiled-public-assets --chown=app:app \
    $_RAILS_ROOT/public/assets $_RAILS_ROOT/public/assets
COPY docker/environment_variables.nginx.conf \
    /etc/nginx/main.d/spacefinder_environment_variables.conf
COPY docker/webapp.nginx.conf \
    /etc/nginx/sites-enabled/webapp.conf
# Removing /etc/service/nginx/down causes nginx to start automatically
RUN rm /etc/service/nginx/down && rm -f /etc/nginx/sites-enabled/default
EXPOSE 80
