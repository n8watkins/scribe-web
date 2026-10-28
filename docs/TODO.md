# Scribe: what's left to do

Kept current as of 2026-10-27 (evening).
The full app assessment plan is in the app repo: `docs/ASSESSMENT_PLAN_2026-10.md`.

## Website (scribe.n8builds.dev)

- [x] The reworked page is live (scribe-web #11, 2026-10-27); checked at 375px in Chromium and WebKit with no horizontal scroll.
- [ ] On phones the app tour ("Make it yours") renders at about a third of its size, so its text is unreadable; give phones a cropped view or a still.
- [x] Fix the Remotion videos' em dashes and false claims, scale them to fill the frame, and use the new 15a in the hero without the zoom (2026-10-27).
- [ ] Redo the videos as real recordings of the app on Windows (see `scribe-review-and-videos.md`), then bring back a tour section.
- [ ] Real screenshots from Windows (taken during the assessment) to replace the drawn previews: every theme including a custom one, the Models screen, the pill's three styles, History, a note with its AI summary, the rewrite-selection flow.
- [ ] A "What's new" page fed from the app's GitHub releases (see release notes below).

## The app (Scribe)

- [ ] Run the full assessment (code, security, UI and UX, reliability, release notes) in a fresh session.
- [ ] Cut the next release (the owner's go-ahead): the security fixes from scribe #40 reach users only with a release.
- [x] Release notes: release-kit adopted in the app (scribe #42); the next release generates the notes and changelog.
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
