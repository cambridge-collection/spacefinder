FROM phusion/passenger-ruby26
ENV HOME /root

# Base Ruby ext and Rails
RUN ln -fs /usr/share/zoneinfo/Europe/London /etc/localtime && \
    apt-get update -qq && \
    apt-get install -y nodejs postgresql-client build-essential patch ruby-dev libpq-dev && \
    gem install nokogiri:1.10.10 bundler --source 'https://rubygems.org/' && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    rm -f /etc/service/nginx/down /etc/nginx/sites-enabled/default && \
    mkdir -p /spacefinder /home/app/webapp

WORKDIR /spacefinder
COPY --chown=app:app . /home/app/webapp
COPY entrypoint.sh /usr/bin/
ADD Gemfile /spacefinder/
ADD nginx/webapp.conf /etc/nginx/sites-enabled/webapp.conf

RUN bundle install

EXPOSE 3000

# Start the main process.
ENTRYPOINT ["entrypoint.sh"]
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
