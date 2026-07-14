# Scribe website

This repository contains the public website for [Scribe](https://github.com/n8watkins/scribe), a private local dictation app for Windows.

The production site is available at [scribe.n8builds.dev](https://scribe.n8builds.dev).

## Development

The site uses Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

Install dependencies and start the local development server:

```bash
npm ci
npm run dev
```

The development server listens on [localhost:7694](http://localhost:7694).

## Quality checks

Run the same checks required by continuous integration:

```bash
npm run lint
npm run build
```

Dependabot checks the npm and GitHub Actions dependencies weekly.

## Deployment

The production site is hosted on Vercel and uses `scribe.n8builds.dev` as its canonical domain.

Production deployments should be created from the repository's default branch after its checks pass.
