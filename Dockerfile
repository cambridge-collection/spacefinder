FROM phusion/passenger-ruby26 as base

ENV RAILS_ROOT /home/app/webapp
ENV RAILS_ENV='production'
ENV RACK_ENV='production'

# Base Ruby ext and Rails
RUN ln -fs /usr/share/zoneinfo/Europe/London /etc/localtime && \
    apt-get update -qq && \
    apt-get install -y nodejs postgresql-client build-essential patch ruby-dev libpq-dev shared-mime-info && \
    gem install nokogiri:1.10.10 bundler --source 'https://rubygems.org/' && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    rm -f /etc/service/nginx/down /etc/nginx/sites-enabled/default && \
    mkdir -p $RAILS_ROOT && chown app $RAILS_ROOT


FROM base as bundler
WORKDIR $RAILS_ROOT
COPY --chown=app:app . $RAILS_ROOT
ADD nginx/webapp.conf /etc/nginx/sites-enabled/webapp.conf

USER app
RUN bundle install


FROM bundler as web
WORKDIR $RAILS_ROOT

USER app
RUN bundle config --local deployment true && bundle install
EXPOSE 3000

USER root
ENTRYPOINT ["/home/app/webapp/entrypoint.sh"]
CMD ["bundle", "exec", "passenger", "start"]
