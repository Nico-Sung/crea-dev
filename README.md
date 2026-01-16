# PARTYNEXTDOOR—Expérience immersive & Cover Generator

Site vitrine pour le nouvel album 2024 de PARTYNEXTDOOR, construit avec Next.js (App Router). On y retrouve une landing cinématique dédiée au projet, une section discographie retraçant l’ensemble de sa carrière et un générateur permettant de créer sa propre pochette inspirée de l’esthétique OVO.

## Prérequis
- Node.js ≥ 18
- pnpm (recommandé). Adaptez les commandes si vous préférez npm, yarn ou bun.

## Installation & développement
```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de dev
pnpm dev
```
Rendez-vous sur [http://localhost:3000](http://localhost:3000) pour voir le site. La page principale est rendue depuis `app/page.tsx` et hot-reload automatiquement.

## Scripts utiles
| Commande      | Description                               |
| ------------- | ----------------------------------------- |
| `pnpm dev`    | Serveur Next.js en mode développement     |
| `pnpm build`  | Build production (Next.js + TypeScript)   |
