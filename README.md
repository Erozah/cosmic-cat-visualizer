# 🐱 Cyber & Cosmic Cat Visualizer (Canvas 2D & Spicetify)

[![Canvas](https://img.shields.io/badge/Render-Canvas_2D_60FPS-blueviolet?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Audio](https://img.shields.io/badge/Audio-Spotify_Player_Events-ff007f?style=for-the-badge)](https://spicetify.app/)
[![License](https://img.shields.io/badge/License-MIT-00f0ff?style=for-the-badge)](LICENSE)

Visualiseur musical immersif haute performance pour Spotify via Spicetify.
Architecture modulaire, modèles félins interchangeables, décors paramétrables et bascule premier plan / arrière-plan figé.

---

## 🏗️ Architecture du Projet (`src/`)

L'ensemble de la logique est découpé en modules dédiés dans le répertoire `src/` :

```
src/
├── audio/
│   ├── AudioEngine.js        # Orchestration audio & synchronisation d'état
│   ├── envelopeFollower.js   # Suivi d'enveloppe, lissage des bandes & respiration
│   ├── spotifyHooks.js       # Écouteurs d'événements Spicetify Player
│   └── tempoEstimator.js     # Estimation algorithmique du BPM
├── backgrounds/
│   ├── BackgroundManager.js  # Orchestration des modes de fond
│   ├── CosmicStar.js         # Particule d'étoile scintillante
│   ├── CyberGrid.js          # Grille 3D synthwave en perspective
│   ├── SacredFractals.js     # Mandalas de géométrie sacrée
│   └── Shockwave.js          # Onde de choc radiale sur les beats
├── core/
│   ├── fullscreenManager.js  # Bascule plein écran immersif & notification
│   ├── keybindings.js        # Raccourcis clavier globaux
│   ├── panelBounds.js        # Synchronisation DPR & dimensions sur la vue centrale
│   ├── renderPipeline.js     # Pipeline d'aiguillage des passes de rendu
│   ├── uiSync.js             # Synchronisation de l'état avec l'interface DOM
│   └── VisualizerEngine.js   # Boucle d'animation principale inarrêtable
├── models/
│   ├── cosmic/
│   │   ├── catBodyPath.js          # Courbes de Bézier du corps félin vu de dos
│   │   ├── catContourRenderer.js   # Contours néon multi-passes ultra-lumineux
│   │   ├── catDeformation.js       # Déformation audio-réactive & respiration
│   │   ├── catEarRenderer.js       # Contours d'oreilles & touffes lumineuses
│   │   ├── CatGeometry.js          # Façade géométrique & repères anatomiques
│   │   ├── catInteriorRenderer.js  # Corps stellaire, cœur pulsar & colonne vertébrale
│   │   ├── deckLighting.js         # Ligne d'horizon, reflets spéculaires & ombre
│   │   ├── deckPlanks.js           # Lattes de bois, veinage texturé & clous
│   │   ├── tailKinematics.js       # Cinématique féline en S & contrainte du sol
│   │   ├── tailPathBuilder.js      # Courbe Catmull-Rom fermée sans allocations
│   │   ├── TailPhysics.js          # Façade physique de la queue
│   │   ├── tailRenderer.js         # Rendu néon de la queue & touffe lumineuse
│   │   ├── tailSparks.js           # Particules d'étincelles du bout de queue
│   │   └── WoodenDeck.js           # Façade plateforme en bois
│   └── cyber/
│       ├── constellationData.js    # Nœuds & liens de la constellation
│       ├── cyberAura.js            # Aura diffuse du corps cyber
│       ├── CyberCat.js             # Façade & minuteurs du modèle Cyber
│       ├── cyberConstellation.js   # Étoiles, liens & pulsation cardiaque
│       ├── cyberContours.js        # Lignes néon du corps & chevrons
│       ├── cyberEyes.js            # Yeux clignotants & pupilles réactives
│       ├── cyberHead.js            # Polygone de tête, oreilles & diamant
│       ├── cyberTail.js            # Queue néon segmentée & faisceau lumineux
│       └── cyberWhiskers.js        # Moustaches vibrantes audio-réactives
├── styles/
│   ├── canvas.css            # Styles du canvas 100vw × 100vh à la racine
│   ├── controlBar.css        # Barre de contrôle flottante sur la zone centrale
│   ├── fullscreen.css        # Styles d'immersion plein écran & toast
│   ├── hud.css               # HUD flottant & pastilles chromatiques
│   ├── main.css              # Index des styles
│   ├── mainView.css          # Occultation propre du contenu Spotify en mode actif
│   ├── playbar.css           # Bouton barre de lecture & correctifs toast
│   ├── root.css              # Variables racine & disposition Spotify
│   └── transparency.css      # Transparence glassmorphic des sidebars et barres
├── theme/
│   ├── paletteHelpers.js     # Décorateurs alpha RGBA dynamiques
│   ├── PaletteManager.js     # Gestionnaire d'état des palettes
│   └── palettesData.js       # Définition des 5 palettes chromatiques
└── ui/
    ├── canvasMount.js        # Montage persistant du canvas global pleine fenêtre
    ├── controlBar.js         # Barre de contrôle flottante discrète
    ├── extension.js          # Point d'entrée & cycle de vie Spicetify
    ├── playbarButton.js      # Bouton dans la barre de lecture Spotify
    └── themeHud.js           # Pastille HUD de contrôle et sélecteurs
```

---

## ✨ Fonctionnalités Clés

### 1. Fond Global Débordant & Transparence Glassmorphic
- **Mode Visualiseur Actif** : Le visualiseur s'étend sur **l'intégralité de la fenêtre (100vw × 100vh)** en arrière-plan global. Les étoiles, la grille synthwave, les mandalas et le ponton débordent et transparaissent sous tous les panneaux Spotify (bibliothèque à gauche, file d'attente à droite, barre de lecture en bas). La page centrale de Spotify s'efface pour laisser le chat respirer en toute clarté.
- **Mode Navigation Spotify** : En appuyant sur <kbd>A</kbd> ou via le bouton de la barre de lecture, la page centrale de Spotify redevient pleinement visible et interactive pour parcourir vos morceaux, tandis que le visualiseur reste en fond ou se fige pour **0% de charge CPU**.

### 2. Deux Modèles Félins Interchangeables
- **🐱 Cyber Cat** : Silhouette vectorielle cyberpunk vue de face, yeux néon clignotants, oreilles réactives, cœur constellation battant au rythme du morceau et moustaches laser.
- **🌌 Cosmic Cat** : Chat assis vu de dos sur un ponton de bois, colonne vertébrale lumineuse et queue organique avec physique inertielle réagissant au BPM et aux percussions.

### 3. Quatre Décors d'Arrière-Plan
- **✨ Étoiles** : Cosmos profond avec étoiles scintillantes et ondes de choc radiales sur les drops.
- **🌐 Cyber Grille** : Grille 3D synthwave animée en perspective avec étincelles montantes.
- **☸️ Fractales** : Rosaces et mandalas de géométrie sacrée en rotation réactive aux fréquences.
- **🌑 Minimal** : Vide obscur et épuré avec auras néon laser discrètes.

---

## ⌨️ Raccourcis Clavier & Contrôles

| Raccourci | Action |
| :--- | :--- |
| <kbd>A</kbd> ou <kbd>V</kbd> | Basculer entre **Actif au premier plan** et **Figé en arrière-plan** |
| <kbd>C</kbd> | Alterner le modèle de chat (**Cyber Cat** ⇄ **Cosmic Cat**) |
| <kbd>B</kbd> ou <kbd>G</kbd> | Alterner le décor d'arrière-plan (**Étoiles** → **Grille** → **Fractales** → **Minimal**) |
| <kbd>T</kbd> | Changer de palette de couleurs |
| <kbd>F</kbd> | Basculer en mode Plein Écran immersif |
| <kbd>Échap</kbd> | Quitter le mode Plein Écran |

Des boutons de contrôle sont également disponibles :
- **Bouton Playbar** : Dans la barre de lecture Spotify en bas à droite pour activer/figer en un clic.
- **Barre supérieure du panneau** : Badges cliquables pour changer de modèle, de fond, de palette ou figer le rendu.
- **HUD flottant** : Pastilles chromatiques et sélecteurs discrets.

---

## 🛠️ Compilation & Déploiement

Le script `build.py` assemble automatiquement tous les modules de `src/` en un seul fichier optimisé `dist/cat-visualizer.js` et le déploie dans le dossier des extensions Spicetify :

```bash
# Compiler le bundle et le copier dans Spicetify
python3 build.py

# Appliquer à Spotify
spicetify apply
```
