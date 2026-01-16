# PARTYNEXTDOOR — Cover Generator

![Moodboard](./public/moodboard.png)

PARTYNEXTDOOR s'immisce dans l'univers digital à l'occasion de la sortie de son album **$ome $exy $ongs 4 U**, fusionnant l'esthétique nocturne et minimaliste de l'OVO avec des éléments génératifs et interactifs.

Explorez une discographie complète retraçant toute la carrière de l'artiste, présentée à travers une timeline verticale immersive avec des cartes interactives.

Enfin débloquez un générateur de cover personnalisable utilisant l'API Canvas : créez vos propres pochettes d'album avec des lignes de flux animées, des effets de glitch dynamiques et des palettes de couleurs uniques.

## Notre intention graphique

Notre objectif est de créer une véritable fusion entre l'univers de l'OVO (October's Very Own), incarné par PARTYNEXTDOOR, et celui de l'art génératif et des effets visuels numériques.

Nous avons donc imaginé une expérience web immersive où chaque section traduit l'identité visuelle du label OVO : des couleurs sombres et profondes, des typographies monospaces et modernes, et une atmosphère nocturne propice à l'introspection avec du bruit et du flou.

L'identité visuelle mêle les couleurs emblématiques de PARTYNEXTDOOR (rouge sang `#c61a1a`, noirs profonds `#050505`) aux lignes de flux organiques et aux effets de glitch caractéristiques de l'art génératif, afin de créer un univers cohérent et immersif qui reflète à la fois l'élégance minimale de l'OVO et la modernité.

### La cover personnalisable

Nous avons développé un générateur de cover interactif utilisant l'API Canvas, fusionnant l'esthétique minimaliste de l'OVO avec l'univers de l'art génératif.

Les utilisateurs peuvent personnaliser leur propre cover en choisissant :

-   **Les lignes de flux génératives** : Des courbes animées qui traversent le canvas depuis les quatre bords (top, bottom, left, right), créant un flux organique et dynamique. Ces lignes sont générées algorithmiquement avec des paramètres de courbure et de largeur ajustables
-   **La palette de couleurs** : Quatre palettes distinctes inspirées de l'univers OVO et des visuels d'albums précédents :
    -   **P3** : Tons rosés et pâles (`#e8b4b8`, `#f5d0c5`) sur fond bleu nuit profond (`#1a1a2e`)
    -   **Nuit** : Nuances cyan et bleu (`#64ffda`, `#8892b0`) sur fond bleu marine (`#0a192f`)
    -   **Braise** : Dégradés rouges et orange (`#ff6b6b`, `#ffa07a`) sur fond noir charbon (`#1a0505`)
    -   **Or** : Tons dorés et jaunes (`#ffd700`, `#daa520`) sur fond noir pur (`#0f0f0f`)
-   **L'intensité du glitch** : Un paramètre ajustable qui contrôle l'amplitude des effets de glitch appliqués aux lignes (décalage RGB, distorsion des segments, blocs de couleur aléatoires)
-   **Les modes de fusion** : Six modes de blend (`lighten`, `screen`, `multiply`, `overlay`, `soft-light`, `hard-light`) permettant de superposer des images de fond avec différents effets de composition
-   **L'opacité de l'image** : Un curseur pour contrôler l'intensité d'une image superposée (par défaut, la pochette de l'album "Some Sexy Songs 4 U") appliquée en niveaux de gris avec contraste et luminosité ajustés
-   **Le bruit visuel** : Un effet de grain/noise généré procéduralement pour ajouter une texture analogique et vintage à la composition
-   **Le flou global** : Un paramètre de blur permettant de créer des effets de profondeur de champ ou de flou artistique
-   **La typographie** : Trois polices disponibles (Montserrat, Courier Prime, Playfair Display) pour le nom de l'artiste et le titre de l'album, avec un rendu en mode `difference` pour créer un effet de texte inversé dynamique

Cette approche permet à chaque fan de créer sa propre version de la cover, reflétant à la fois son style personnel et l'esprit de la collaboration entre l'esthétique OVO et l'art génératif.

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
