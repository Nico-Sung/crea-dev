# PARTYNEXTDOOR — Cover Generator

![Moodboard](./public/moodboard.png)

Site web immersif dédié au nouvel album **$ome $exy $ongs 4 U** de PARTYNEXTDOOR, fusionnant l'esthétique nocturne et minimaliste de l'OVO avec des éléments génératifs et interactifs. L'expérience est enrichie d'un overlay de bruit animé généré procéduralement via Canvas sur toutes les pages, créant une texture cinématographique.

## Notre intention graphique

Notre objectif est de créer une fusion entre l'univers OVO (October's Very Own) et l'art génératif numérique. L'identité visuelle mêle les couleurs emblématiques de PARTYNEXTDOOR (rouge sang `#c61a1a`, noirs profonds `#050505`) aux lignes de flux organiques et aux effets de glitch, créant un univers cohérent qui reflète l'élégance minimale de l'OVO et la modernité.

### La cover personnalisable

Générateur de cover interactif utilisant l'API Canvas. Les utilisateurs peuvent personnaliser leur cover avec :

-   **Lignes de flux génératives** : Courbes animées traversant le canvas depuis les quatre bords, générées algorithmiquement
-   **Palette de couleurs** : Quatre palettes (P3, Nuit, Braise, Or) inspirées de l'univers OVO
-   **Intensité du glitch** : Paramètre contrôlant les effets de glitch (décalage RGB, distorsion, blocs colorés)
-   **Modes de fusion** : Six modes de blend (`lighten`, `screen`, `multiply`, `overlay`, `soft-light`, `hard-light`)
-   **Opacité d'image** : Contrôle de l'intensité d'une image superposée en niveaux de gris
-   **Bruit visuel** : Grain procédural pour une texture analogique
-   **Flou global** : Effets de profondeur de champ
-   **Typographie** : Trois polices (Montserrat, Courier Prime, Playfair Display) avec rendu en mode `difference`

## Prérequis

-   Node.js ≥ 18
-   pnpm (recommandé). Adaptez les commandes si vous préférez npm, yarn ou bun.

## Installation & développement

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de dev
pnpm dev
```

Rendez-vous sur [http://localhost:3000](http://localhost:3000) ou bien <https://party-next-door-cover.vercel.app/> pour voir le site. La page principale est rendue depuis `app/page.tsx` et hot-reload automatiquement.

## Scripts utiles

| Commande     | Description                             |
| ------------ | --------------------------------------- |
| `pnpm dev`   | Serveur Next.js en mode développement   |
| `pnpm build` | Build production (Next.js + TypeScript) |
