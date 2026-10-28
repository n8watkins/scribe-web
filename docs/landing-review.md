# Landing page review (feat/landing-level-up)

The owner's three review rounds of scribe.n8builds.dev, 2026-10-27.
Nothing here is merged or deployed: the branch is a preview for the owner to approve.

## Preview

```
cd ~/projects/tools/scribe/scribe-web-lvl   # a worktree of scribe-web on feat/landing-level-up
npx next build && npx next start -p 3841     # then open http://localhost:3841
```

`node_modules` is a symlink to the main checkout's (`../scribe-web/node_modules`).
Checks: `npm run lint` (no warnings allowed), `npx tsc --noEmit`, `npx next build`.
The repo has no tests.

## What changed

- **Hero:** the line "Talk. It types.", a plain one-sentence pitch, the real 15-second demo video (plays muted and loops while on screen; still, with controls, under reduced motion), and a direct Download for Windows with the real version and size read from the latest GitHub release (hourly, with a fallback).
- **Header:** a thin "A free app from n8builds.dev" band, the n8builds mark beside Scribe's, How it works / Private by design / FAQ, Ko-fi (its own blue and red), the repo, Download.
- **How it works:** an animated scene of the real loop (Ctrl + Win down, the pill filling in phrase by phrase, the key up, the sentence typed into an email draft with eased, character-by-character typing) beside four steps on a rail that fills in sync. One requestAnimationFrame clock, paused off screen, the finished state under reduced motion.
- **Features:** six plain rows, icon beside the text.
- **Private by design:** "Your voice stays on your PC", as two boxes: what stays on your PC, and the complete list of what goes online and when. Facts from the app's source (`scribe-app/app/src-tauri/src`: update_check.rs, model_manager.rs, github_backup.rs, note_analysis.rs, whisper_server.rs).
- **Videos:** the 30-second tour and the privacy clip, with real poster frames.
- **FAQ:** answers rewritten plainly; an accessible accordion (buttons with aria-expanded and aria-controls, keyboard) that opens smoothly.
- **CTA:** "Give it a try. It's free.", Download and Ko-fi, the SmartScreen note and checksums.
- **Footer:** a "Scribe is one of my free tools on n8builds.dev" card, a site map (Scribe, Get it, n8builds.dev: the Lab, Scribe's build page, the build log, the portfolio), Ko-fi and the owner's GitHub, and "This site sets no cookies and runs no analytics" with a link to `/privacy`.
- **/privacy:** a short privacy policy (no cookies, no analytics, no third parties; Vercel hosting; GitHub downloads) and a summary of the app.
- **Tone:** plain everywhere, "Free speech-to-text for Windows" (title, metadata, share card).
- **SEO:** a generated 1200x630 share card, favicon, SoftwareApplication JSON-LD, `/privacy` in the sitemap, Inter self-hosted (next/font; it was named but never loaded before).

## Checked

- No cookies, no browser storage, and no requests to any other host, on the live site and the preview, so no consent banner is needed. If analytics is ever added, use n8builds.dev's consent approach (the shared `.n8builds.dev` consent cookie and its region-aware banner).
- Security headers unchanged and still strict (CSP with only 'self', HSTS, frame-ancestors none, Permissions-Policy).
- Every external link returns 200. `scribe.n8builds.dev/privacy` returns 404 until this branch is deployed.
- No horizontal scroll at 375; no console errors.

## Open items

- The owner approves the preview, then: push the branch, open a PR on n8watkins/scribe-web, and merge (Vercel deploys `main`).
- The demo videos have an em dash baked into their caption ("Talk", em dash, "and Scribe types"); only a re-recording removes it.
- The installer isn't code-signed, so SmartScreen warns. Signing needs a certificate the owner buys.
- Scribe has 13 unreleased commits since v0.8.0 (dependency fixes); a release (push a `v*` tag in n8watkins/scribe) makes the page's version and size update on their own.
