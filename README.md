# New Padrino Website

Currently under development.

Uses the following gems:

* [Middleman](https://github.com/middleman/middleman) - Static website builder
* [Slim](https://github.com/slim-template/slim) - Templating engine
* [Breakpoint](https://github.com/at-import/breakpoint) - Easy Sass media queries
* [Susy](https://github.com/ericam/susy) - Sass layout toolkit

## Current Screenshots

**Desktop**

<img width="150" alt="screen shot 2015-09-10 at 1 23 35 am" src="https://cloud.githubusercontent.com/assets/8601064/9787033/a7257958-575a-11e5-86c5-e5c5995bd4fb.png"> <img width="150" alt="screen shot 2015-09-10 at 1 25 29 am" src="https://cloud.githubusercontent.com/assets/8601064/9787053/e1fb3f86-575a-11e5-8d2a-6d6c573bcdc0.png"> <img width="150" alt="screen shot 2015-09-10 at 1 24 03 am" src="https://cloud.githubusercontent.com/assets/8601064/9787042/c1e66ca2-575a-11e5-9277-a486dac40ce9.png"> <img width="150" alt="screen shot 2015-09-10 at 1 25 11 am" src="https://cloud.githubusercontent.com/assets/8601064/9787057/f9fcb218-575a-11e5-83d5-eeced6e8745f.png">

**Mobile**

<img width="150" alt="screen shot 2015-09-10 at 2 29 23 pm" src="https://cloud.githubusercontent.com/assets/8601064/9804340/5b745ca4-57c8-11e5-8f24-886e40e22621.png"> <img width="150" alt="screen shot 2015-09-10 at 1 27 56 am" src="https://cloud.githubusercontent.com/assets/8601064/9787091/3fd182d2-575b-11e5-9e4a-2276d139ea5d.png"> <img width="150" alt="screen shot 2015-09-10 at 1 28 17 am" src="https://cloud.githubusercontent.com/assets/8601064/9787089/3fa6eaae-575b-11e5-9563-16247e686767.png"> <img width="150" alt="screen shot 2015-09-10 at 1 28 22 am" src="https://cloud.githubusercontent.com/assets/8601064/9787090/3fd13980-575b-11e5-9897-6f75310d6dfb.png">

## Deployment instructions

1. Update the docs through submodule

```
rake update
```

2. Deploy the site to gh-pages

```
middleman deploy
```

3. Visit the site at <http://padrinorb.com>

## Build instructions

1. Clone to your machine.
   ```
   git clone https://github.com/padrino/padrino-web-new.git
   ```

2. Install gem dependencies with Bundler.
   ```
   bundle install
   ```

3. Start the Middleman server.
   ```
   bundle exec middleman server
   ```

4. Visit <http://localhost:4567>
