# 🏰 Hourglass Nexus — React Frontend

## 📦 Installation & Lancement

```bash
npm install
npm run dev     # Serveur dev (localhost:5173)
npm run build   # Build production dans /dist
npm run preview # Prévisualisation du build
```

---

## 🗂 Structure du projet

```
src/
├── main.jsx                 # Point d'entrée React
├── App.jsx                  # Router principal (lock → charCreate → app)
├── hooks/
│   ├── useGame.jsx          # 🎮 STORE PRINCIPAL — état global, contexte React
│   └── storage.js           # localStorage wrapper
├── data/
│   └── personas.json        # 📋 DONNÉES — guide, clans, personas (MODIFIER ICI)
├── components/
│   ├── BgDecor.jsx          # Jour/nuit cycle
│   ├── LockScreen.jsx       # Écran de verrouillage (drag guide)
│   ├── CharCreate.jsx       # Création de personnage + choix du clan
│   ├── Header.jsx           # Horloge + date
│   ├── FooterAssembly.jsx   # Diamant + nav + panel coulissant
│   ├── OrbHealth.jsx        # Orbe rouge (vitalité, bas-gauche)
│   ├── OrbMana.jsx          # Orbe bleue (mana, bas-droite)
│   ├── OrbPurple.jsx        # ✨ Orbe violette (clans, au-dessus de bleue)
│   ├── ClanMap.jsx          # 🗺 Carte des clans (style Assassin's Creed)
│   ├── PersonaDetail.jsx    # Fiche détaillée d'un persona
│   └── Modal.jsx            # Modal générique
├── pages/
│   ├── AccueilPage.jsx      # Page d'accueil
│   ├── UserPage.jsx         # Page profil du joueur
│   └── WorldMapPage.jsx     # Carte du monde avec dots de clans
└── styles/
    ├── global.css            # Variables, orbes, layout, animations
    └── components.css        # Lock screen, char create, clan map, pages
```

---

## 📋 COMMENT MODIFIER LES DONNÉES

Tout se passe dans **`src/data/personas.json`**. Ce fichier contient 3 sections :

### 1. Le Guide (A.T.O.M.)

```json
"guide": {
  "id": "atom",
  "name": "A.T.O.M.",
  "role": "Guide",
  "title": "Architecte Temporel des Origines Mécaniques",
  "avatar": "/assets/settings.png",
  "color": "#06b6d4",
  "element": "Temps",
  "bio": "Description...",
  "traits": ["Analytique", "Omniscient", "Énigmatique", "Neutre"],
  "stats": { "CRE": 80, "SAG": 99, "CHA": 70, "FOR": 60, "AGI": 65 },
  "quote": "Le temps ne pardonne pas, mais il enseigne."
}
```

**Modifier le guide :** Changez directement les valeurs.

### 2. Les 13 Clans

```json
"clans": [
  {
    "id": "lame-ardente",        // ← ID unique (pas d'espace, kebab-case)
    "name": "La Lame Ardente",   // ← Nom affiché
    "icon": "🔥",                // ← Emoji du clan
    "color": "#ef4444",          // ← Couleur hexadécimale
    "desc": "Description...",    // ← Description courte
    "element": "Feu",           // ← Élément associé
    "motto": "Par le feu..."    // ← Devise du clan
  }
]
```

#### ➕ Ajouter un clan
Ajoutez un objet dans le tableau `clans` avec un `id` unique.

#### ✏️ Modifier un clan
Changez n'importe quelle propriété (name, icon, color, etc.)

#### ❌ Supprimer un clan
Retirez l'objet du tableau. **Attention :** supprimez aussi tous les personas qui ont ce `clan` ID.

### 3. Les 324 Personas

```json
"personas": [
  {
    "id": "p000",               // ← ID unique
    "name": "Silas Sunfire",    // ← Nom complet
    "title": "Guerrier — le Brave", // ← Rôle + surnom
    "role": "Guerrier",         // ← Classe/métier
    "clan": "lame-ardente",     // ← ID du clan (doit exister dans clans)
    "color": "#ef4444",         // ← Couleur de la carte
    "difficulty": "Rare",       // ← Commun|Peu commun|Rare|Épique|Légendaire
    "element": "Feu",           // ← Élément
    "bio": "Description...",    // ← Biographie
    "traits": ["Courageux", "Loyal", "Rusé", "Sage"],  // ← 4 traits
    "stats": {                  // ← Stats (0-100)
      "CRE": 65, "SAG": 45, "CHA": 72, "FOR": 88, "AGI": 55
    },
    "quote": "Citation...",     // ← Citation
    "avatar": null              // ← URL d'image ou null (affiche initiales)
  }
]
```

#### ➕ Ajouter un persona
1. Ajoutez un objet dans le tableau `personas`
2. Donnez-lui un `id` unique (ex: `"p325"`)
3. Remplissez le `clan` avec un ID existant
4. Les stats vont de 0 à 100

#### ✏️ Modifier un persona
Changez n'importe quelle propriété.

#### ❌ Supprimer un persona
Retirez l'objet du tableau.

#### 🖼 Ajouter un avatar
- Placez l'image dans `public/assets/` (ex: `mon-perso.png`)
- Mettez `"avatar": "/assets/mon-perso.png"` dans le persona
- Si `avatar` est `null`, les initiales du nom s'affichent

---

## 🎨 COMMENT MODIFIER LE DESIGN

### Couleurs & Variables CSS
Tout est dans **`src/styles/global.css`** au début (`:root`).

### Orbes
- **Rouge** : `OrbHealth.jsx` + classes `.liq-red-*` dans `global.css`
- **Bleue** : `OrbMana.jsx` + classes `.liq-blue-*` dans `global.css`
- **Violette** : `OrbPurple.jsx` + classes `.liq-purple-*` dans `global.css`

### Positions des orbes
```css
.orb-left-fixed { bottom: -5px; left: 5px }     /* Rouge */
.orb-right-fixed { bottom: -5px; right: 4px }    /* Bleue */
.orb-purple-fixed { bottom: 75px; right: 10px }  /* Violette (au-dessus) */
```

### Animations
Les keyframes sont dans `global.css` : `bubbleRise`, `potionBubble`, `manaBubble`, `waveShift1/2/3`, etc.

---

## 🔮 FONCTIONNEMENT DE LA BOULE VIOLETTE

1. La boule violette est positionnée **au-dessus** de la boule bleue (bottom-right)
2. Au clic → ouvre la **Carte des Clans** (composant `ClanMap.jsx`)
3. La carte affiche :
   - Le joueur en haut (avec son clan marqué ★)
   - Les 13 clans avec accordéons dépliables
   - Le clan du joueur est en premier et ouvert par défaut
   - Chaque persona est cliquable → ouvre sa fiche détaillée
   - Barre de recherche pour trouver un persona par nom/rôle/élément

---

## 🎮 FLOW DU JEU

1. **Lock Screen** → Drag le guide A.T.O.M. dans le portail
2. **Character Creation** → Intro dialog → Avatar → Nom → **Choix du clan** → Farewell
3. **Main App** → Accueil / Profil / Carte du Monde
   - Boule violette → Carte des clans (325 personnages, 13 clans)
   - Boule bleue → Carte du monde
   - Boule rouge → Vitalité (décorative)
   - Losange → Panneau coulissant

---

## 📊 Résumé des données

| Élément | Quantité |
|---------|----------|
| Guide | 1 (A.T.O.M.) |
| Clans | 13 |
| Personas | 324 |
| Joueur | 1 (vous) |
| **Total adeptes** | **325** |

---

## 💡 Tips

- Pour rebuild après modification : `npm run build`
- Le fichier `personas.json` est importé directement dans le JS (pas de fetch)
- Les images vont dans `public/assets/` et sont référencées avec `/assets/nom.png`
- Le localStorage est préfixé `hn_` pour éviter les conflits
