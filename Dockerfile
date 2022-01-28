FROM phusion/passenger-ruby30 as base

ENV RAILS_ROOT /home/app/webapp
ENV RAILS_ENV='production'
ENV RACK_ENV='production'

# Base Ruby ext and Rails
RUN ln -fs /usr/share/zoneinfo/Europe/London /etc/localtime && \
    apt-get update -qq && \
    apt-get install -y nodejs postgresql-client build-essential patch ruby-dev libpq-dev shared-mime-info && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    rm -f /etc/service/nginx/down /etc/nginx/sites-enabled/default && \
    mkdir -p $RAILS_ROOT && chown app $RAILS_ROOT


FROM base AS web
WORKDIR $RAILS_ROOT
USER app

# install dependencies before the rest of the files to avoid invalidating the
# build cache and having to re-install deps on every change.
COPY --chown=app:app Gemfile Gemfile.lock $RAILS_ROOT
RUN bundle install --jobs 8

COPY --chown=app:app . $RAILS_ROOT
COPY nginx/webapp.conf /etc/nginx/sites-enabled/webapp.conf

EXPOSE 3000
ENTRYPOINT ["/home/app/webapp/entrypoint.sh"]
CMD ["bundle", "exec", "passenger", "start"]
