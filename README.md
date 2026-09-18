# Developer Portfolios

An open, community-built directory of developers. Students, juniors and seniors alike. No portfolio site needed, just a GitHub account and one small file.

Every developer is one Markdown file in [`portfolios/`](portfolios), named after their GitHub username. The site is built from those files with [Astro](https://astro.build) and published on GitHub Pages.

## Add yourself

**The easy way:** open the builder on the site (`/add/`), fill in the form, and it opens GitHub with your file ready. Commit it and open the pull request.

**By hand:** create `portfolios/<your-github-username-in-lowercase>.md`:

```md
---
name: Ada Lovelace
role: Full Stack Developer
bio: I build web apps and I am learning Rust.
level: junior
tags: [react, node, rust]
open_to_work: true
location: United Kingdom
linkedin: ada-lovelace
portfolio: https://ada.dev
---
```

A bot checks your pull request. If everything is fine it merges automatically and you are live within minutes. If not, it comments with exactly what to fix.

## Fields

| Field          | Required | Rules                                                              |
| -------------- | -------- | ------------------------------------------------------------------ |
| `name`         | Yes      | 2 to 50 characters                                                 |
| `role`         | Yes      | 2 to 40 characters, like `Backend Developer`                       |
| `bio`          | Yes      | 20 to 160 characters, one line, no links                           |
| `level`        | Yes      | `student`, `junior`, `mid`, `senior` or `lead`                     |
| `tags`         | Yes      | 2 to 8 skills, lowercase, like `[react, node]`                     |
| `open_to_work` | Yes      | `true` or `false`                                                  |
| `location`     | No       | Country name in English, like `India`                              |
| `portfolio`    | No       | Full `https://` link                                               |
| `blog`         | No       | Full `https://` link                                               |
| `linkedin`     | No       | Username only                                                      |
| `x`            | No       | Username only                                                      |
| `devto`        | No       | Username only                                                      |
| `medium`       | No       | Username only, without `@`                                         |
| `youtube`      | No       | Handle only, without `@`                                           |
| `stackoverflow`| No       | Your numeric user ID                                               |
| `leetcode`     | No       | Username only                                                      |
| `codepen`      | No       | Username only                                                      |
| `dribbble`     | No       | Username only                                                      |
| `npm`          | No       | Username only                                                      |

Your GitHub link and photo are added automatically from your username.

Skills are normalized, so `React.js` becomes `react` and `C++` becomes `cpp`. New skills are welcome, but pick an existing one when it fits so people can find you.

## Rules

- One file per person, and you can only add, edit or delete your own file.
- The file name is your GitHub username in lowercase.
- GitHub accounts must be at least 30 days old.
- Only the fields above, nothing below the closing `---`.

To remove yourself, delete your file in a pull request. To report a profile, use the **Report** link on it.

## Your data

- Everything in your profile is public: on this site, on GitHub and in search engines. Only add what you are happy to share.
- There are no cookies, analytics or trackers, and no email or phone fields.
- The builder runs in your browser. Nothing you type is sent to this project.
- You can change or delete your profile at any time. Deleting your file removes you from the site on the next deploy.
- Lost access to your account? Open a [removal request](../../issues/new?template=removal.yml).

Read the full [privacy page](https://abhay-vachhani.github.io/developer-portfolios/privacy/) on the site.

## Run it locally

```sh
docker compose up -d --build
```

Then open http://localhost:4321.

To check every profile file, run `docker compose exec app npm run validate`. The same check runs before every deploy.

## License

The source code is released under the [MIT license](LICENSE).

The profile files in `portfolios/` are not covered by it. Each file belongs to the person it describes, who shares it only for display in this directory and can remove it at any time.
