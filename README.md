# padcaster-portal-front-end

React + Next.js static front-end for the Padcaster Portal web site.

---

### Prerequisites

[VS Code](https://code.visualstudio.com/) is recommended for working on this project.

This application requires [node 14+](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/).

---

### Setup

Set up the project:

```bash
yarn
```

If you receive a "certificate has expired" error when running `yarn`, try:

```bash
yarn config set "strict-ssl" false -g
```

---

### Dev

Run the development server:

```bash
yarn run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Updates will appear in real time as you save your files.

To update images and assets, edit or replace files in the "public" folder. Source files are in "src".

---

### Code Management and Deployment

##### Contributing Code

Please follow this protocol to contribute code from the Git CLI:

- `git checkout main`
- `git pull`
- `git checkout -b`_`[branch]`_
- `git push -u origin`_`[branch]`_
- _do work and commits here_
- `git checkout main`
- `git pull`
- `git checkout`_`[branch]`_
- `git rebase`_`[-i]`_`main`
- _fix any conflicts_
- `git push`

When your work is ready for review, create a pull request on [Github](https://github.com/rehashstudio/padcaster-portal-front-end).

##### Branch Naming

The following branch names are reserved. Do not commit directly to these branches.

- `main`
  - The main development branch.
- `staging`
  - Merging to this branch triggers deployment to the staging and media buckets.\
- `prod`
  - Merging to this branch triggers deployment to the production and media buckets.
- `stable/YYYY-MM-DD-V`
  - Archive of production branch deployed on _`YYYY-MM-DD`_, where _`V`_ is the version number, if multiple deployments happened that day. These branches should be made for every deployment for quick reversions.
- `archive/YYYY-MM-DD`
  - Archive of unstable branch made on _`YYYY-MM-DD`_. Use this to preserve experimental or unused code.

When creating branches to perform work, please use the following naming conventions (`-ii` represents your first and last initials):

- `PAD-###`_`-ii`_
  - When your work addresses a Jira ticket, use the ticket ID as the branch name. If multiple developers may be working on the same ticket, append your initials. For example, `PAD-108-ss`. **Prefer this format.** If a ticket doesn't exist for your work, please create one, or request one from your PM. Fall back to another format otherwise.
- `feature/ii-description`
  - Use this format when adding a new feature not associated with an issue.
- `experiment/ii-description`
  - Use the `experiment` prefix for sandbox branches with breaking or destructive changes. Branches prefixed with `experiment` will not be considered for merging into main. If an experimental branch is successful, create a new `feature` branch from it for PR.
- `hotfix/ii`
  - Use the `hotfix` prefix and your initials for time-constrained updates, or updates which may address multiple high-priority issues.
- `update/ii-description`
  - Use this format when updating existing functionality with non-breaking changes not associated with an issue, feature, or a hotfix.

##### Code Review

When reviewing code, please do the following:

- `git pull`
- `git checkout`_`[branch]`_
- _build, run, test_
- _On [Github](https://github.com/rehashstudio/padcaster-portal-front-end)_

  - _fail_
    - _Reject PR, dev works/commits and re-PRs_
    - _Assign ticket to dev_
  - _pass_
    - _Approve_
    - _Merge_
    - _Delete feature branch_

##### Deployment

To deploy source code to `staging` or `prod`, perform an export, then merge `main` into the deployment target. _DO NOT_ merge `staging` into `prod`, or vice versa. Doing so will overwrite the workflow files, disabling automation for that deployment pipeline.

To prevent conflicts, the static build must be removed, committed, exported, and then added and committed again _inside_ the deployment branch. Please _do not_ add the contents of the `out` folder to `main`.

- `git checkout main`
- `git pull`
- `git checkout`_`[staging|prod]`_
- `git pull`
- `git rm -r out`
- `git commit -a -m "Removed out directory"`
- _Delete your "out" directory_
- `git merge main -s resolve`
- `yarn export`
- `git add out`
- `git commit -a -m "Deployment"`
- `git push`

This will push the contents of the repository's `out` directory to S3 and run CloudFront invalidations. It will also push the contents of the `public` directory to the media bucket and run invalidations there.

CloudFront URLs:

- App Staging: [d2bd8pkml4hv61.cloudfront.net](https://d2bd8pkml4hv61.cloudfront.net)
- App Production: [d1q5vru2pqzowf.cloudfront.net](https://d1q5vru2pqzowf.cloudfront.net)
- Media Staging: [d30jf7yxjcpan1.cloudfront.net](https://d30jf7yxjcpan1.cloudfront.net)
- Media Production: [d30cav32sjpp9e.cloudfront.net](https://d30cav32sjpp9e.cloudfront.net)
