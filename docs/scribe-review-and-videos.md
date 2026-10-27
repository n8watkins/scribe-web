# Next: a full look at Scribe, and its videos

Owner request (2026-10-27): do a complete pass over how Scribe is built, and redo the videos on scribe.n8builds.dev.
This note is the starting point for that session.

## 1. How Scribe is built

- The app lives in `~/projects/tools/scribe/scribe-app` (Tauri 2: a React front end in `app/src`, Rust in `app/src-tauri/src`).
- Speech runs through a bundled whisper.cpp server (`whisper_server.rs`), with models from `models.rs` (Tiny to Large v3 Turbo, English and multilingual, default Small English Q5_1).
- Worth reviewing end to end:
  - every feature as a user sees it, against what the landing page says (round 4 added a full feature list from the source);
  - settings defaults (`settings.rs`) and whether each one is the right default;
  - first-run experience: model download, hotkey test, the SmartScreen warning;
  - updates (`lib/updates.ts`, `App.tsx`: launch check plus every 6 hours, signed installs on launch);
  - the optional online parts (`github_backup.rs`, `github_oauth.rs`, `note_analysis.rs`) for privacy and failure handling;
  - performance (model load time, latency from key release to text), memory use, and the installer size;
  - code signing (the installer is unsigned) and the 13 unreleased commits since v0.8.0.
- Output: a findings list with fixes, then the landing page and the n8builds.dev build page updated to match.

## 2. The videos

The four videos on the site are animated mockups made in Remotion, not recordings of the app.
Their source is `~/n8builds/assets/n8builds-promo/src/videos/Scribe.tsx` (shared pieces in `src/shared/ScribeMock.tsx`).

Problems found in round 4:

- `Scribe-15a` (the hero video): the content fills only the middle half of the frame, so it reads small; the page now zooms it 1.25x as a stopgap.
  It also has em dashes, in the dictated line ("Talk", dash, "and Scribe types...") and in the window title ("Untitled", dash, "typing where your cursor is").
- `Scribe-15b` (tour, right): the "Local Whisper, audio stays offline" line has an em dash.
- `Scribe-30a` (tour, left): says "Google sign-in → Drive backup of transcripts", which is wrong; Scribe backs up to GitHub.
  It also has em dashes in two cards ("Pick your model", "Ctrl+Alt+V").
- `Scribe-30b` is not used on the page.

Plan:

1. Record the real app on Windows (OBS, 1440p or 4K), cropped tight on the action: the pill while talking, text landing in a real app, the dashboard, models, history, settings.
2. Rebuild the Remotion compositions around those recordings, with copy checked against the app (no em dashes, nothing the app doesn't do), and the content scaled to fill the frame.
3. Replace the hero video and the two tour videos, then drop the 1.25x zoom in `components/Hero.tsx`.
4. Re-check the posters (`public/posters`) and the share card.
