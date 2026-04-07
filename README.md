# PALSEC AGCY

Multi-page portfolio built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Router v6**.

## Scripts

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (showreel) |
| `/services` | Services |
| `/projects` | Projects grid |
| `/about-us` | About |
| `/project/:slug` | Project detail |
| `*` | 404 (unknown paths) |

### Project slugs

See `ProjectSlug` in [`src/data/projects.ts`](src/data/projects.ts).

## Stack

- Vite 6 + React 18 + TypeScript
- Tailwind CSS 3
- Framer Motion
- React Router 6
- Fonts: Geist Mono + Caveat (Google Fonts)

Placeholder imagery uses [picsum.photos](https://picsum.photos/) with fixed seeds where no local assets are set.
