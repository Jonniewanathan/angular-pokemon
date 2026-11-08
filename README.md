# Pokémon browser (Angular)

A small app built to compare Angular and React on the same set of features. The React version is at
[pokemon-react](https://github.com/YOUR-USERNAME/pokemon-react), with the same functionality and layout
and a different theme colour.

Data and sprites come from [PokeAPI](https://pokeapi.co). This is an unofficial fan project and is not
affiliated with or endorsed by Nintendo or The Pokémon Company.

## Features
- Browse Pokémon fetched from the API, with loading and error states
- Debounced search
- Favourites that persist across reloads
- Detail page for each Pokémon (routing with a URL parameter, plus a not found page)
- A note form for favourites, with validation and error messages shown once a field is touched
- Unit and component tests

## Tech stack
- Angular 21 with standalone components, signals and the built-in control flow
- Angular Router and `HttpClient`
- Reactive Forms with a custom validator
- RxJS (debounce, `switchMap`) with `toSignal` and `takeUntilDestroyed`
- Vitest and `TestBed`
- SCSS with CSS custom properties for theming

## Getting started
Requires Node 20.19+ or 22.12+ (or 24+).

```bash
npm install
npm start
```
Then open http://localhost:4200.

| Command | What it does |
|---|---|
| `npm start` | Start the dev server (`ng serve`) |
| `npm run build` | Create a production build |
| `npx ng test` | Run the tests in watch mode |
| `npx ng test --no-watch` | Run the tests once |

## Project structure
```
src/app/
  components/   Reusable UI (favourite-button, note-form)
  models/       Interfaces (pokemon, pokemon-detail)
  pages/        Routed screens (list, detail, favourites, not-found)
  services/     PokemonService (API) and FavouritesService (signal store)
  validators/   Custom form validator
  app.config.ts Providers and router setup
  app.routes.ts Route definitions
```

## What it demonstrates
- A signal-based store in a root-provided service, persisted with an `effect`
- Cleanup of subscriptions with `takeUntilDestroyed` and `DestroyRef`
- Debounced search with RxJS and `toSignal`
- Route params bound to component inputs, and `switchMap` to cancel superseded requests
- Reactive Forms with a custom validator and touched-based error display
- Testing a service, components and pages, with `HttpTestingController` for the network

## Angular vs React, in this project
| | Angular (this repo) | React |
|---|---|---|
| Shared state | Signal-based service | Zustand store |
| Data fetching | `HttpClient` in a service | Custom hooks with `fetch` |
| Debounce | RxJS `debounceTime` | `useDebounce` hook |
| Forms | Reactive Forms | Controlled inputs, manual validation |
| Routing | Angular Router | React Router |
| Tests | Vitest and `TestBed` | Vitest and React Testing Library |
