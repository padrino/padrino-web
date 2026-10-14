# New Padrino Website

Built using [Middleman](https://github.com/middleman/middleman).

## Screenshots

<img width="49%" alt="Home page" src=".github/screenshots/home.avif"> <img width="49%" alt="Guide page" src=".github/screenshots/guide.avif">
<img width="49%" alt="Home page in dark mode" src=".github/screenshots/home-dark.avif"> <img width="20%" alt="Guide page on mobile" src=".github/screenshots/mobile.avif">

## Local Server Instructions

1. Clone the repository with the docs submodule, which holds the guides and
   blog posts.

   ```shell
   git clone --recurse-submodules https://github.com/padrino/padrino-web.git
   ```

2. Install Ruby 3.1 (see `.ruby-version`) and the gem dependencies.

   ```shell
   bundle install
   ```

3. Start the Middleman server. It reloads the browser when you edit the site
   or the docs.

   ```shell
   bundle exec middleman server
   ```

4. Visit <http://localhost:4567>

To preview changes from a local checkout of
[padrino-docs](https://github.com/padrino/padrino-docs), pull them into the
submodule:

```shell
cd docs && git pull ../../padrino-docs master
```

## Deployment

The [Build and deploy](.github/workflows/deploy.yml) workflow builds the site
against the latest padrino-docs `master` and pushes it to the `gh-pages`
branch, which GitHub Pages serves at <https://padrinorb.com>. It runs on every
push to `master`, daily to pick up docs changes, and on demand from the
Actions tab. Pull requests are built but never deployed.

To deploy right after a docs change, run the workflow manually or have
padrino-docs send a `docs-updated`
[repository dispatch](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)
event.

To deploy from your machine instead, update the docs, build and deploy in a
single command:

```shell
rake publish
```

## Manual Build Instructions

1. Update the docs through submodule.

   ```shell
   rake update
   ```

2. Build the static site.

   ```shell
   middleman build
   ```

3. Deploy the site to gh-pages.

   ```shell
   middleman deploy
   ```

4. Visit the site at <http://padrinorb.com>.
