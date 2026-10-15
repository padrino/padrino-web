---
title: Contribute
---

# Contribute

Want to show Padrino some love? Help out by contributing to our framework!

<div class="excerpt">
  <a href="https://github.com/padrino/padrino-framework" class="button">View on GitHub</a>
</div>

---

## Need help?

Start with the [guides](/guides/), which cover most topics. If you are still
stuck, ask your question on
[GitHub Issues](https://github.com/padrino/padrino-framework/issues). Search the
existing issues first, since your question may already have an answer. If
something in the guides is wrong or missing, open an issue on the
[docs issue tracker](https://github.com/padrino/padrino-docs/issues) instead.

---

## Found a bug?

Let us know by
[creating a new issue](https://github.com/padrino/padrino-framework/issues). Be
sure to include all relevant information, like the versions of Padrino and Ruby
you are using. A [gist](https://gist.github.com/) of the code that caused the
issue as well as any error messages are also very helpful.

---

## Found a security issue?

Please don't open a public issue. Report it privately through
[GitHub's private vulnerability reporting](https://github.com/padrino/padrino-framework/security/advisories/new)
instead.

---

## Want to integrate a component?

Have a particular JavaScript engine you like? Know of a popular ORM or testing
framework that we have overlooked in Padrino generators? We encourage you to
contribute by creating a patch to integrate your favorite components into
Padrino! Check out the guide for
[adding new components](/guides/adding-components/overview/)
to read a detailed walkthrough of how to do this!

---

## Want to help with documentation?

The process for contributing to Padrino’s documentation is as simple 
as forking the [docs repository](https://github.com/padrino/padrino-docs) and 
sending in any changes as a pull request. Once a change has been accepted, the 
documentation will be updated on our website. The website guides and docs are 
currently in the [GitHub Flavored Markdown](https://github.github.com/gfm/) 
format as can be seen for the 
[Getting Started](https://github.com/padrino/padrino-docs/blob/master/guides/02_getting-started/01_overview.html.md) 
guide on GitHub. Changes to the website itself go to the
[website repository](https://github.com/padrino/padrino-web) the same way.


### YARD

There is also important YARD documentation within the framework code itself
which could always use improvements. An example is the
[asset tag](https://github.com/padrino/padrino-framework/blob/master/padrino-helpers/lib/padrino-helpers/asset_tag_helpers.rb)
helpers file which is marked up with YARD annotations for every object and
method.

Be sure to read over the
[YARD Getting Started](https://rubydoc.info/gems/yard/file/docs/GettingStarted.md)
and [Tag Overview](https://rubydoc.info/gems/yard/file/docs/Tags.md) guides for
more details on this syntax. Every component of Padrino should be documented
with YARD annotations, which are published in our
[API reference](https://www.rubydoc.info/github/padrino/padrino-framework).

---

## Code Guidelines

Padrino core contributors also have several code guidelines and conventions that
we try and keep consistent within our codebase, such as two space soft tab
indentations and a newline at the end of every ruby file. The framework
repository ships a
[RuboCop configuration](https://github.com/padrino/padrino-framework/blob/master/.rubocop.yml)
that encodes them; run `bundle exec rubocop` on the files you change.

Another convention to keep in mind is to minimize all trailing and unnecessary
whitespace. Match the style of the code around your change.

---

## Have a patch?

Bugs and feature requests that include patches are much more likely to get
attention. Here are some guidelines that will help ensure your patch can be
applied as quickly as possible:

1. Use [Git](https://git-scm.com/) and [GitHub](https://github.com/): The easiest
   way to get setup is to fork the
   [padrino repo](https://github.com/padrino/padrino-framework). For guide
   changes, fork the [docs repository](https://github.com/padrino/padrino-docs)
   instead.
2. Write unit tests: If you add or modify functionality, it must include unit
   tests. If you don’t write tests, we have to, and this can hold up acceptance
   of the patch.
3. Mind the README: If the patch adds or modifies a major feature, modify the
   README.rdoc file to reflect that. Again, if you don’t update the README, we
   have to, and this holds up acceptance.
4. Push it: Once you’re ready, push your changes to a topic branch on your
   fork and open a pull request. If it fixes an issue, mention the issue
   number in the description.

**NOTE:** we will take whatever we can get. If you prefer to attach a diff to
  an issue, that’s fine; but do know that someone will need to
  take the diff through the process described above and this can hold things up
  considerably.

---

## Looking for something to do?

If you’d like to help out but aren’t sure how, take a look at the
[GitHub Issues](https://github.com/padrino/padrino-framework/issues) page. If you
find something that looks interesting, leave a comment on the issue noting that
you’re investigating (a simple “Taking…” is fine). Once you’ve worked on a few
issues, someone will add you as an assignee.
