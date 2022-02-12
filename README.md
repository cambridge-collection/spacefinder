# Spacefinder

[![CI](https://github.com/cambridge-collection/spacefinder/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/cambridge-collection/spacefinder/actions/workflows/ci.yml)
[![Publish Docker Images](https://github.com/cambridge-collection/spacefinder/actions/workflows/docker.yml/badge.svg)](https://github.com/cambridge-collection/spacefinder/actions/workflows/docker.yml)
[![Docker Image](https://img.shields.io/static/v1?label=&message=Docker+Image&color=blue&logo=gitlab)][registry]
[![Apache License](https://img.shields.io/badge/license-Apache-blue)](http://www.apache.org/licenses/LICENSE-2.0)

[Spacefinder] is a web app that helps Cambridge University students find spaces
to match their study needs and preferences. For background on the Spacefinder
project, see: https://www.lib.cam.ac.uk/futurelib/spacefinder.

[spacefinder]: https://spacefinder.lib.cam.ac.uk/

This is the open-source Rails app that runs Spacefinder.

## Developing

The repository contains a [Visual Studio Code devcontainer] configuration.
VSCode can use it to automatically create a development environment in a Docker
container. These instructions assume you're using the devcontainer. If you're
not, you'll need to manually install dependencies and adapt instructions to some
degree.

### Setup

[visual studio code devcontainer]:
   https://code.visualstudio.com/docs/remote/containers

Clone this repository and open it in VSCode. VSCode should prompt you to re-open
the project in a devcontainer. Reference this video if you're not familar with
devcontainers: https://www.youtube.com/watch?v=ELdZxGtqu6w

The devcontainer has Ruby installed and a postgres server running in a second
container. It runs `bin/setup` while starting, so the environment is ready once
VSCode has finished opening the devcontainer.

### Running the web app

Run the rails server to launch the Spacefinder webapp:

From VSCode, open the _Run and Debug_ menu, select "rails dev server" from the
drop-down menu, and hit the start button.

Or from the terminal, run:

```
bin/rails server
```

After the server starts, VSCode will prompt you to open the app in your browser.

### Testing

From VSCode, open the _Run and Debug_ menu, select one of the "test: \*"
configurations from the drop-down menu, and hit the start button. The "test:
selected test" and "test: selected file" configurations will run the thing the
cursor is on in the active editor.

Run all tests from the terminal with:

```
bin/rails test
```

### Debugging

VSCode runs the rails server and tests with the Ruby debugger enabled by
default. The debugger will stop at breakpoints in `.rb` or `.erb` files.

## Deployment

Spacefinder is deployed as a Docker container, images are in the
[gitlab.developers.cam.ac.uk][registry]. An image is built and published from
the `main` branch on every push, and weekly (the OS packages are updated on each
build).

[registry]:
   https://gitlab.developers.cam.ac.uk/lib/dev/spacefinder/spacefinder/container_registry/

### Image Tags

The `:latest` image tag is :

-  `registry.gitlab.developers.cam.ac.uk/lib/dev/spacefinder/spacefinder:latest`

Versioned tags are available from the [registry].

### Configuration

The app reads configuration from environment variables:

-  Database:
   -  `SPACEFINDER_DATABASE_NAME`
   -  `SPACEFINDER_DATABASE_USER`
   -  `SPACEFINDER_DATABASE_PASSWORD`
   -  `SPACEFINDER_DATABASE_HOST`
-  Rails
   -  `SPACEFINDER_SECRET_KEY` or `SECRET_KEY_BASE`
-  SAML Authentication
   -  `SPACEFINDER_SAML_CERTIFICATE`
   -  `SPACEFINDER_SAML_PRIVATE_KEY`
   -  `SPACEFINDER_SAML_ISSUER`
   -  `SPACEFINDER_SAML_SP_ENTITY_ID` — Defaults to
      `https://${SPACEFINDER_SAML_ISSUER}/shibboleth`
-  Google Maps
   -  `SPACEFINDER_GOOGLE_MAPS_API_KEY`

By default the `db:prepare` task is run at container startup, to either create
the database or run pending migrations. Set `SPACEFINDER_DB_PREPARE` to a value
other than `true` to disable this.

## Re-using Spacefinder & Contributing

We've open-sourced Spacefinder with the hope that it may be useful to people
outside Cambridge University. Feel free to use the app as you like.

Spacefinder was created as a proof of concept pilot project for Cambridge
University, so it will require some amount of development work to use it in a
different context. The two main factors are authentication and
look-and-feel/theme. Neither of these are configurable without changing the
code.

The authentication expects to use Cambridge University's Raven authentication
service, so the authentication configuration code would need to be changed to
use it outside Cambridge. That said, it uses SAML, so it would be
straightforward to adapt for any of the many higher-education institutions using
SAML via [Shibboleth](https://www.shibboleth.net/about-us/members/).

We welcome contributions to Spacefinder, whether to help make it more adaptable,
or any other enhancements.
