# Scribe: what's left to do

Kept current as of 2026-10-27.
The full app assessment plan is in the app repo: `docs/ASSESSMENT_PLAN_2026-10.md`.

## Website (scribe.n8builds.dev)

- [ ] Owner approves the reworked page (desktop), then a phone-size pass (375), then a PR to scribe-web and a deploy.
  Vercel's free plan allows 100 deploys per rolling 24 hours across the whole account; check there's room first.
- [x] Fix the Remotion videos' em dashes and false claims, scale them to fill the frame, and use the new 15a in the hero without the zoom (2026-10-27).
- [ ] Redo the videos as real recordings of the app on Windows (see `scribe-review-and-videos.md`), then bring back a tour section.
- [ ] Real screenshots from Windows (taken during the assessment) to replace the drawn previews: every theme including a custom one, the Models screen, the pill's three styles, History, a note with its AI summary, the rewrite-selection flow.
- [ ] A "What's new" page fed from the app's GitHub releases (see release notes below).
- [ ] `/privacy` returns 404 on the live site until this branch is deployed.

## The app (Scribe)

- [ ] Run the full assessment (code, security, UI and UX, reliability, release notes) in a fresh session.
- [ ] Cut the next release: 13 commits on `main` since v0.8.0.
- [ ] Release notes: adopt release-kit, and bring `CHANGELOG.md` up to date (it stops at 0.6.0; releases are at v0.8.0).
- [ ] Code signing for the installer (needs a certificate), so Windows stops warning people.
- [ ] Findings so far, for the assessment to confirm:
  - the "type it out" paste fallback exists in code but has no setting in the app;
  - Ctrl+Alt+R (rewrite selection) is bound even when the AI tools are off;
  - five Dependabot PRs open since July;
  - the local checkout sits on `feat/rust-storage-profiles`, not `main`.

## Release notes: the proposed setup

- The app is the one thing that has versions, so its GitHub releases are the single source of truth.
- release-kit writes user-facing notes for each app release and generates `CHANGELOG.md` from them.
- The website shows those same notes on a "What's new" page (read from GitHub at build time, like the download button's version already is), so the site never needs its own copy.
- The website itself doesn't get versions or release notes: it is deployed continuously, and its changes are visible in its commit history.
- n8builds.dev's build log already reads Scribe's releases, so it picks up the better notes for free.

## n8builds, related

- [ ] Subdomains for Portfolio Rank and Net Trailers (and Echo on Render), with the old vercel.app addresses redirecting; waits on the owner's DNS and Vercel steps.
- [ ] Analytics for Portfolio Rank (it has none) and Net Trailers (it reports to a separate GA property).
