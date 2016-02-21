## Lightweight

The Padrino code base has been kept simple and easy to understand, maintain and
enhance. The generator for each new project creates a clean and compact
directory structure keeping **your** code simple and well organized.

Padrino strives to adhere to the following basic principles:

> Tiny and fast. Clean and compact. Creative and concise.

This framework can be used with ease for web development for a project of any
size from your lightweight json web service to a large full-stack web
application!

<a href="/guides/getting-started/basic-projects/" class="button">Learn more</a>

--------------------------------------------------------------------------------

## Drop-In Admin

Padrino ships with an Admin Interface that includes the following features:

Feature            | Description
------------------ | --------------------------------------------------------------------
**ORM/ODM**        | Adapters for datamapper, activerecord, sequel, mongomapper, mongoid
**Authentication** | Account authentication support and permission management
**Template**       | View support for Erb and Haml rendering engines
**Scaffold**       | Create a model “admin interface” by invoking a command
**i18n**           | Translated into 10 languages including English, Spanish, and Italian

```shell
$ padrino-gen project cool --orm activerecord
$ cd cool
$ padrino-gen admin
$ padrino-gen admin page post
```

<a href="/guides/features/padrino-admin/" class="button">Learn more</a>

--------------------------------------------------------------------------------

## Comprehensive

Building on our experience in developing web applications, we designed a
framework that meets all the requirements for creating a top notch web
application in a clean, concise and simple environment, with minimal deadline
delays.

We provide you with the following out of the box:

Feature          | Description
---------------- | ----------------------------------------------------------------------------------------
**Agnostic**     | Full support for many popular testing, templating, mocking, and database libraries.
**Generators**   | Create Padrino applications, models, controllers, admin.
**Mountable**    | Unlike other ruby frameworks, principally designed for mounting multiple apps.
**Routing**      | Full url named routes, named params, respond_to support, before/after filter support.
**Helpers**      | Different helpers for generating tags, forms, links, images, and more.
**Mailer**       | Fast and simple support for delivering emails.
**Caching**      | Simple route and fragment caching to easily speed up your web requests.
**Admin**        | Built-in admin interface (akin to Django) with authentication.
**Logging**      | Provides a unified logger that can interact with your ORM or any library of your choice.
**Reloading**    | Automatically reloads server code during development.
**Localization** | Full support for I18n localization.

<a href="/guides/" class="button">Learn more</a>

--------------------------------------------------------------------------------

## Agnostic

Padrino is ORM/ODM, JavaScript, testing, rendering, and mocking agnostic
supporting the use of any number of available libraries.

The available components and their defaults are listed below:

Component  | Default | Options
---------- | ------- | -----------------------------------------------------------------
ORM/ODM    | none    | activerecord, datamapper, mongomapper, mongoid, sequel, couchrest
JavaScript | none    | prototype, rightjs, jquery, mootools, extcore
Renderer   | Slim    | Erb, Haml, Slim
Test       | none    | Bacon, Shoulda, Cucumber, Riot, RSpec
Stylesheet | none    | Less, Sass, SCSS, Compass
Mock       | none    | rr, Mocha

Just create the project with the usual generator command and pass in your
preferred components!

```shell
$ padrino g project cool --orm datamapper
$ padrino g project cool --renderer haml --stylesheet sass
$ padrino g project cool --script mootools
$ padrino g project cool --orm mongoid --script mootools
$ padrino g project -h ## shows available options
```

<a href="/guides/generators/overview/" class="button">Learn more</a>

--------------------------------------------------------------------------------

## Sinatra Core

Many people love the simplicity and expressiveness of Sinatra but quickly find
themselves missing a great deal of functionality provided by other web
frameworks such as Rails when building non-trivial applications.

Sinatra acts as a thin layer on top of Rack itself and the "micro"-framework is
kept light introducing complexities only when required by the particular
application.

> Our goal with Padrino is to stay true to the core principles of Sinatra
> including a focus on simplicity and modularity.

Starting from this assumption, we have developed a different approach to a web
development framework. We expand on Sinatra through the addition of standard
libraries including helpers, components, and other functionality that are needed
in a framework suitable for arbitrarily complex web applications.

<a href="/guides/advanced-usage/standalone-usage-in-sinatra/" class="button">Learn more</a>
