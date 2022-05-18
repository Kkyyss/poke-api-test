# Poke API test

## A pokemon search terminal app that utilizing [https://pokeapi.co/](https://pokeapi.co/) open API.

## Features
- search by pokemon ID
- search by pokemon Name
- encounters limited to kanto

## Notes
Create a `.env` file in the same directory as `.env.example`. Necessary keys are defined in `.env.example`.

## Installation & Build (Makefile)
- `make ib`

## Installation & Build (Yarn/NPM)
- `yarn install` or `npm install`
- `yarn build` or `npm build`

## Development (Makefile)
- `make dev`
 
## Development (Yarn)
- `yarn run build:watch`

## Release/Clean Build (Makefile)
- `make r`
 
## Release/Clean Build (Yarn/NPM)
- `yarn run build:release` or `npm run build:release`

## Run Program (Makefile)
- `make s`

## Run Program (Yarn/NPM)
- `yarn start` or `npm start`