# IsometryJS

[![Travis](https://travis-ci.org/randallmorey/isometryjs.svg?branch=master)](https://travis-ci.org/randallmorey/isometryjs)
[![Maintainability](https://api.codeclimate.com/v1/badges/6268f6db3a51774dec30/maintainability)](https://codeclimate.com/github/randallmorey/isometryjs/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6268f6db3a51774dec30/test_coverage)](https://codeclimate.com/github/randallmorey/isometryjs/test_coverage)

A tiny JavaScript library for doing isometric maths.


## Contributing

Contributions consistent with the style and quality of existing code are
welcome.  Be sure to follow the guidelines below.

Check the issues page of this repository for available work.


### Branching & Committing

This project follows [a successful git branching model][nvie-git-branching].
It uses [commitizen][commitizen] and
[cz-conventional-changelog][cz-conventional-changelog] to
ensure that commit messages remain well-formatted and consistent across
different contributors, and that breaking changes are not committed.

Before committing for the first time, install commitizen:

```
npm install -g commitizen
```

[Watch a helpful video about commitizen][commitizen-video], but follow the
directions here for actual usage within this project.

To start work on a new change, pull the latest `develop` and create
a new _topic branch_ (e.g. `feature-resume-model`, `chore-test-update`,
`bugfix-bad-bug`).  Work should be committed to
[topic branches][nvie-git-branching] only, never directly to mainline branches.
To begin a commit, stage changes as usual:

```
git add .
```

To commit, run the following command (instead of `git commit`) and follow the
directions:

```
npm run commit
```

When committing in this manner, _tests are executed automatically and all tests
must pass before the commit can be finalized_.  If tests fail, please address
the issue(s) and try the commit procedure again.

We recommend making incremental commits at logical stopping points whenever
possible, rather than large monolithic commits at the end of a feature.


### Pull Requests

When a topic branch is ready to merge, submit a pull request from the topic
branch into `develop` via GitHub.  Pull requests are automatically tested in CI
and may only be merged after all checks pass successfully.  At that time,
a core team member may merge the PR into `develop`.


### Issue References

Commit messages and pull requests should
[short link to GitHub issues][issue-autolinking] when referencing information in
the issue; though not every commit or PR related to an issue needs to
reference it.  Commits and PRs that fix or resolve an issue should
[close the issue in the message][issue-closing].


[nvie-git-branching]: http://nvie.com/posts/a-successful-git-branching-model/
[commitizen]: https://www.npmjs.com/package/commitizen
[cz-conventional-changelog]: https://www.npmjs.com/package/cz-conventional-changelog
[commitizen-video]: https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-committing-a-new-feature-with-commitizen
[issue-autolinking]: https://help.github.com/articles/autolinked-references-and-urls/
[issue-closing]: https://help.github.com/articles/closing-issues-using-keywords/
