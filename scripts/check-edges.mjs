// Checks the built site's edges through the real Worker (`wrangler dev` on
// out/): unknown paths answer 404 with Scribe's not-found page, and the CSP
// lets the Cloudflare Web Analytics beacon and Sentry through.
// Usage: node scripts/check-edges.mjs http://localhost:8787
import assert from "node:assert/strict";

const base = (process.argv[2] ?? "http://localhost:8787").replace(/\/$/, "");

const res = await fetch(`${base}/zz-no-such-page`, { redirect: "manual" });
assert.equal(res.status, 404, `unknown path answered ${res.status}`);
const html = await res.text();
assert.match(html, /<h1[^>]*>Nothing to type out here\.<\/h1>/, "404 page heading");

const csp = (await fetch(`${base}/`)).headers.get("content-security-policy") ?? "";
assert.match(csp, /script-src [^;]*https:\/\/static\.cloudflareinsights\.com/, "CSP allows the beacon");
assert.match(csp, /connect-src [^;]*\.ingest\.us\.sentry\.io/, "CSP allows Sentry");

console.log("edges ok: 404 page and CSP");
