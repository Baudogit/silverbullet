# Documentation - Observer Multi-Attributs pour SilverBullet

## 📋 Vue d'ensemble

Ce script applique automatiquement des couleurs aux valeurs d'attributs frontmatter dans les tâches SilverBullet, sans clignotement même lors de modifications intensives du DOM.

### Problème résolu

SilverBullet modifie fréquemment le DOM (focus, saisie, rendu), ce qui retire les attributs personnalisés et provoque des clignotements visuels. Ce script restaure instantanément ces attributs.

---

## 🎯 Fonctionnement

### Architecture en 3 couches

```
┌─────────────────────────────────────────────────────┐
│  Couche 1 : CSS avec !important                    │
│  → Applique la couleur instantanément              │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Couche 2 : Attribut data-attr-colored             │
│  → Marqueur sur chaque élément frontmatter         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Couche 3 : Observer "sentinelle"                  │
│  → Surveille 1 élément, répare TOUS les attributs  │
└─────────────────────────────────────────────────────┘
```

### Flux d'exécution

```
Démarrage
    ↓
Attente de system:ready (SilverBullet prêt)
    ↓
setupAttributeObserver()
    ├─ Parcourt toutes les tâches
    ├─ Marque les attributs cibles avec data-attr-colored="nom"
    ├─ Compte les éléments surveillés
    └─ Installe observer sur le 1er élément (sentinelle)
    ↓
Observer détecte une modification
    ↓
repairAllAttributes()
    ├─ Parcourt TOUS les attributs
    ├─ Restaure data-attr-colored si manquant
    └─ Compte les réparations
    ↓
CSS applique la couleur instantanément
```

---

## ⚙️ Configuration

### Attributs surveillés

```(js)
const ATTRIBUTES_CONFIG = [
    { name: 'date', color: 'cyan' },
    { name: 'statut', color: 'red' },
    { name: 'attrib1', color: 'green' },
    { name: 'attrib2', color: 'orange' }
];
```

**Pour ajouter un attribut :**
1. Ajouter une ligne dans `ATTRIBUTES_CONFIG`
2. Ajouter la règle CSS correspondante dans `style.textContent`

### Intervalle de statistiques

```(js)
const STATS_INTERVAL_MS = 30000; // 30 secondes
```

---

## 🔧 Fonctions principales

### `setupAttributeObserver()`
**Rôle :** Initialise le système de surveillance
- Parcourt toutes les tâches et marque les attributs cibles
- Installe l'observer sentinelle sur le 1er élément trouvé
- Appelée à l'init et à chaque ajout de nouveaux éléments

### `repairAllAttributes()`
**Rôle :** Répare tous les attributs en une seule passe
- Déclenchée par l'observer sentinelle
- Utilise `isFixingGlobal` pour éviter les boucles infinies
- Compte le nombre de réparations effectuées

### `logStats()`
**Rôle :** Affiche les statistiques de performance
- Mutations traitées : nombre de détections par l'observer
- Mutations réparées : nombre d'attributs restaurés
- Ratios calculés sur l'intervalle réel écoulé

---

## 📊 Optimisations clés

### 1. Observer unique "sentinelle"
**Avant :** 1 observer par élément (78 observers pour 78 attributs)
**Maintenant :** 1 seul observer qui surveille le 1er élément

**Avantage :** Réduction de ~95% des callbacks

### 2. Réparation globale
Quand 1 mutation est détectée → réparer TOUS les attributs

**Logique :** Si SilverBullet modifie 1 attribut, il en modifie probablement plusieurs

### 3. Filtrage strict
```(js)
attributeFilter: ['data-attr-colored']
```
On ignore les modifications de `class` et `style`

### 4. Flag anti-boucle
```(js)
let isFixingGlobal = false;
```
Empêche de réagir à nos propres modifications

---

## 📈 Performances attendues

### Avec 20 tâches × 4 attributs (80 éléments)

| Scénario | Mutations/sec | Réparations/sec |
|----------|---------------|-----------------|
| **Initialisation** | ~1 | ~20 |
| **Navigation** | ~0.5 | ~10 |
| **Au repos** | 0 | 0 |
| **Saisie intensive** | ~1-2 | ~15-20 |

---

## 🛠️ Dépannage

### Attributs non colorés
**Cause :** L'attribut n'est pas dans `ATTRIBUTES_CONFIG`
**Solution :** Ajouter la configuration + la règle CSS

### Couleur incorrecte
**Cause :** Règle CSS mal définie ou attribut `data-attr-colored` incorrect
**Solution :** Vérifier la cohérence entre config et CSS

### Performance dégradée
**Cause :** Trop d'attributs (>200) ou timer trop court
**Solution :** Augmenter `STATS_INTERVAL_MS` ou optimiser le nombre d'attributs

---

## 🔍 Console & Monitoring

### Commandes disponibles

```js
// Afficher les stats immédiatement
attributeColorStats.log()

// Consulter les données brutes
attributeColorStats.get()

// Réinitialiser les compteurs
attributeColorStats.reset()
```

### Interprétation des stats

- **Éléments surveillés** : Nombre d'attributs marqués
- **Mutations traitées** : Nombre de détections par l'observer
- **Mutations réparées** : Nombre d'attributs restaurés
- **Mutations/sec** : Fréquence des détections
- **Réparations/sec** : Fréquence des corrections

**Valeurs saines :**
- < 1 mutation/sec au repos
- < 30 réparations/sec en saisie intensive

---

## 🎨 Personnalisation

### Changer les couleurs

Modifier dans `style.textContent` :
```(css)
.sb-frontmatter[data-attr-colored="date"] { 
    color: cyan !important; 
}
```

### Ajouter des styles supplémentaires

```(css)
.sb-frontmatter[data-attr-colored="priorite"] { 
    color: yellow !important;
    font-weight: bold !important;
}
```

### Désactiver pour les tâches cochées

**Déjà implémenté :** Les tâches avec `.cm-task-checked` sont automatiquement exclues

---

## 📝 Notes techniques

### Pourquoi un seul observer ?
- Moins d'overhead
- Batching des réparations
- 1 seul repaint du navigateur

### Pourquoi `!important` en CSS ?
- Garantit la priorité absolue
- Pas de clignotement même si SilverBullet applique des styles inline

### Pourquoi `setTimeout(..., 0)` ?
- Permet au moteur JavaScript de traiter les autres tâches
- Désactive le flag après la fin du cycle d'événements actuel

---

## 📜 Licence & Crédits

Script développé pour SilverBullet  
Optimisé pour gérer 100+ attributs simultanément  
Compatible avec les versions récentes de SilverBullet (2024+)