# Pokémon browser (Angular)

Learning project for a technical interview. It is the Angular half of a side-by-side
comparison with a React app that has the same features (React app: `C:\dev\pokemon-react`).
Both apps should look the same and differ only by theme colours (React: cyan on dark,
Angular: red on light) and by how each framework does the work.

## How to help
- I am an experienced Angular developer learning React. This repo is for practice, so
  explain concepts, review code I have written, and explain errors.
- Do not write feature code unless I ask. When I do ask, keep it minimal and follow the
  conventions below.
- Keep answers short. When something differs from React, say how.

## Stack
- Angular 21, standalone components, signals, built-in control flow (`@if`, `@for`)
- SCSS, with the shared styles in `src/styles.scss`
- Node 22 with npm 11 (Windows, PowerShell, WebStorm)
- Data from PokeAPI: `https://pokeapi.co/api/v2/pokemon`

## Commands
- `npx ng serve` runs the app at `http://localhost:4200`
- `npx ng test` runs the tests
- `npx ng build` creates the production build
- Generate files with the CLI: `npx ng generate component|service|interface ...`

## Conventions (classic Angular, deliberately followed so the comparison is fair)
- File names with suffixes: `*.component.ts`, `*.service.ts`, `*.model.ts`.
  Classes are named to match: `ListPageComponent`, `PokemonService`.
  The `schematics` block in `angular.json` makes the CLI generate these suffixes.
  The root `app.ts` and `App` class come from the v21 CLI and are left as generated.
- Models are interfaces, stored in `src/app/models/`. Never `type` aliases for object shapes.
- Folders: `models/`, `services/`, `pages/` (routed screens), `components/` (reusable UI).
- Selector prefix `app-`. Use `inject()` for dependency injection.
- State is held in signals (`signal`, `computed`). Services that hold state are
  root-provided singletons, as in a signal store.
- Fetch in `ngOnInit` and clean up with `takeUntilDestroyed(this.destroyRef)`.
- Forms use Reactive Forms with built-in `Validators`.
- Debounced search uses RxJS `debounceTime` and `toSignal`.
- No semicolons in prose. Code follows the project's Prettier config.

## Features (mirrors the React app)
1. List fetched with `HttpClient` and signals, with loading and error states
2. Debounced search box
3. Favourites in a signal store, persisted to `localStorage` under the key `favourites`
4. Routing: `/` list, `/pokemon/:name` detail, `/favourites`, `**` for not found
5. Note form on the detail page (required, min 3 and max 100 characters, errors shown once touched)
6. Shared styling using CSS custom properties, with the Angular theme block

## Status
- [x] Project created, models, `PokemonService`, list page
- [ ] Debounced search
- [ ] Favourites store and button
- [ ] Routing, detail page, favourites page
- [ ] Note form
- [ ] Styling
- [ ] Tests
- [ ] Comparison summary with the React app
