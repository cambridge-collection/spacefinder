FROM phusion/passenger-ruby26
ENV HOME /root
CMD ["/sbin/my_init"]
RUN bash -lc 'rvm --default use ruby-2.6.6'
# RUN /pd_build/ruby-2.6.*.sh

# Base Ruby ext and Rails
RUN apt-get update -qq \
        && apt-get install -y nodejs postgresql-client \
        && apt-get install -y build-essential patch ruby-dev \
        # && zlib1j-dev liblzma \
        && apt-get install libpq-dev

RUN gem install nokogiri -v '1.10.10' --source 'https://rubygems.org/'
RUN gem install bundler -v 2.0.0
RUN apt-get install -y rails

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Build GEMs for this project
RUN mkdir /spacefinder
WORKDIR /spacefinder
ADD Gemfile /spacefinder/
RUN bundle install

# NGINX
RUN rm -f /etc/service/nginx/down
RUN rm /etc/nginx/sites-enabled/default
ADD nginx/webapp.conf /etc/nginx/sites-enabled/webapp.conf
RUN mkdir /home/app/webapp
COPY --chown=app:app . /home/app/webapp


# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]