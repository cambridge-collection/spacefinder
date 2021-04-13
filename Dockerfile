FROM phusion/passenger-ruby26

ENV RAILS_ROOT /home/app/webapp
RUN mkdir -p $RAILS_ROOT
WORKDIR $RAILS_ROOT
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
    mkdir -p $RAILS_ROOT

# NGINX
COPY entrypoint.sh /usr/bin/
ADD nginx/webapp.conf /etc/nginx/sites-enabled/webapp.conf

USER app
COPY --chown=app:app . $RAILS_ROOT
COPY Gemfile $RAILS_ROOT
RUN bundle install

EXPOSE 3000

ENTRYPOINT ["entrypoint.sh"]
#CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-e", "production"]
CMD ["bundle", "exec", "passenger", "start"]

