# Deploying the Scribe website

The site is a fully static Next.js export (`output: "export"`) served by Cloudflare Workers static assets, with no server routes.
The `scribe-web` Worker in the owner's Cloudflare account (`wrangler.jsonc`) serves `out/` at https://scribe.n8builds.dev.
The hostname is attached as a Workers custom domain, so Cloudflare creates and manages its DNS record itself; the `workers.dev` address is turned off.

The only script, `worker/index.js`, runs for `/videos/*` alone and answers byte-range requests with `206 Partial Content`, because static assets always send the whole file and Safari plays a video only when ranges work.
Every other request is served straight from the assets.

Security and cache headers live in `public/_headers`, because a static export has no server to send them.
There is no runtime image optimizer, so images ship as committed; add small copies (like `public/scribe-icon-64.png`) instead of shrinking large files in the browser.
The share card (`app/opengraph-image.tsx`) is rendered once at build time into `out/opengraph-image`, and `public/_headers` gives it its `image/png` type.

## Automatic deploys

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, hourly, and on demand from the Actions tab.
The hourly run keeps the latest release, the What's new page and the GitHub star count fresh, since the build reads them from GitHub.
It needs a `CLOUDFLARE_API_TOKEN` repository secret: a Cloudflare API token made from the "Edit Cloudflare Workers" template, limited to the owner's account.
Until that secret exists, the workflow builds and then skips the deploy with a notice.
GitHub pauses scheduled workflows in a repository with no activity for 60 days; re-enable it from the Actions tab if that happens.

## Deploy by hand

Log in once with `npx wrangler login` (check with `npx wrangler whoami`).
Run `npm run lint`, then `npm run deploy`.
`npm run deploy` runs `next build` (writes `out/`) and then `wrangler deploy`, which uploads only changed assets.
To check the build locally first, run `npm run build && npm run preview` and open http://localhost:8787.

## Roll back

Run `npx wrangler deployments list` to see recent deployments, or `npx wrangler versions list` to see versions.
Run `npx wrangler rollback` to return to the previous version, or `npx wrangler rollback <version-id>` for a specific one.
Static assets are versioned with the Worker, so a rollback restores the old pages too.
Fix forward afterwards by reverting the commit and deploying again, so the repository matches what is live.

## Taking it down

Run `npx wrangler delete scribe-web`, which also removes any custom domain and its DNS record.
