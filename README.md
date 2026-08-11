# Aura

A small, growing collection of ambient gradient backgrounds built from layered CSS blend modes — soft, atmospheric, and easy to drop behind any interface. Built with Next.js, React, and Tailwind CSS.

## Features

- Ambient multi-layer gradients (aura, mesh, nebula, prism, grain, glass, flux, lattice)
- Live preview: pick a gradient and the whole page picks up its glow
- In-browser customizer — edit layers, blend modes, blur, and base color
- Copy CSS or export your gradient in multiple formats
- Light mode by default, with a dark mode toggle

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Stars Badge

The header and footer show live GitHub star counts. The count is fetched client-side from the `/api/github` route handler, which proxies the GitHub API.

- Optionally set `GITHUB_TOKEN` in `.env.local` to raise the GitHub API rate limit.
- The route revalidates cached data every hour.

## Scripts

| Command       | Description                |
| ------------- | -------------------------- |
| `pnpm dev`    | Start the dev server       |
| `pnpm build`  | Production build           |
| `pnpm lint`   | Run ESLint                 |

## License

MIT
