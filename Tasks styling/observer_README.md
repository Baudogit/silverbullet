
Les attributs permettent de qualifier le statut d’une tâche, de définir sa priorité, de l’affecter à une catégorie, de fixer une échéance, etc .... Personnaliser leur affichage avec des règles de style CSS facilite la lecture des informations lors du parcours des pages.

# Tasks styling

## Limites actuelles

Les classes CSS associés aux attributs de tâche ne permettent pas, actuellement, un réglage fin de l’affichage, pour deux raisons :
- la classe générique "sb-frontmatter" est commune à tous les attributs (de tâche, de liste et de page, y compris les attributs définis dans le frontmatter)
- la valeur d'attribut, stockée dans un <`span`> dédié, n'est pas associée à une classe spécifique
  
![[images/classes.png]] 
Une issue a été récemment ouverte par @Zeff Hemel [https://github.com/silverbulletmd/silverbullet/issues/1740](https://github.com/silverbulletmd/silverbullet/issues/1740) pour étendre les possibilités de personnalisation via des balises de données ("data-*") associées à la valeur d’attribut.

**Ce script js est une solution d’attente, cohérente avec l’évolution envisagée.**

## Contrainte

L'injection “en temps réel” de classes CSS dans le DOM se heurte à une difficulté : SilverBullet reconstitue le code HTML de la page à haute fréquence. Un clic dans la page, la prise ou la perte de focus, la saisie de données, l’évaluation d’une expression Lua, etc ... sont autant d’occasions d'un réalignement de la page et, donc, d’un effacement des éléments injectés.

Rappel du principe de base de SilverBullet : "**la vérité est dans le markdown**".

# Conception

Pour résoudre cette contrainte, le script **observer.js**, réalisé avec Claude AI (plusieurs jours de travail et 30 versions), est un compromis entre efficacité, simplicité, facilité de paramétrage pour l’utilisateur et consommation minimale de ressources.

Le script est stable dans les conditions testées. Il est cependant conseillé de **tester prudemment** avec de grandes quantité de pages ou en cas de saisie intensive. Une version avec debug, logs et mesures est mise à disposition.

## Principe

Outil JS utilisé : l'interface **MutationObserver**().
Environnement : le script s’exécute localement, dans la session client courante.
Attention : si vous avez plusieurs frames ouvertes via Document Explorer, vous pourriez observer des défaillances d’affichage, chaque frame ayant sa propre session.

Les **règles CSS** peuvent s’appliquer séparément au nom des attributs et à leur valeur. Elles sont incorporées au `space-lua` (PAS `space-style`) de lancement du script JS.

Le `space-lua` est prérempli, pour exemple, avec 4 attributs (date, statut, attrib1, attrib2) et 3 valeurs possibles de “statut”. Une 2ème variable récapitule le nom des attributs stylés. Vous pouvez ajoutez/supprimer des attributs, modifier leur nom, modifier les valeurs stylées et, bien entendu, modifier les styles associés.

Les règles CSS et la liste des noms d’attribut sont passées en paramètre au script lors de son lancement. Des valeurs par défaut (correspondant au paramétrage de la page de tests) sont incorporées au script JS.
  
## Fonctions principales

### `setupAttributeObserver()`
Parcourt toutes les tâches de la page courante, marque les attributs cibles avec `data-attr-name` et `data-attr-colored`, puis installe un observer "sentinelle" sur le premier élément trouvé. La sentinelle surveille uniquement son propre attribut `data-attr-colored` et déclenche une réparation globale à chaque modification détectée.

### `repairAllAttributes()`
Répare tous les attributs de la page en une seule passe. Utilise le flag `isFixingGlobal` pour éviter les boucles infinies. Ajoute `data-attr-value` pour permettre le styling conditionnel CSS. Exclut automatiquement les tâches cochées (`.cm-task-checked`).

### `initScript()`
Initialise le système : appelle `setupAttributeObserver()`, installe un observer global pour détecter les nouveaux éléments DOM, et enregistre un listener sur l'événement `focus` pour réappliquer la protection lors des interactions utilisateur.

![[TECH/PROJETS/01/script.png]]

# Mise en oeuvre

### Dépôt

Les deux fichiers (JS et MD) sont publiés dans un dépôt  [Github](https://github.com/Baudogit/silverbullet/tree/main) (pas de procédure normalisée avec Library Manager 🙁) :

- **observer.js** (js minimal de 132 lignes, non minifié)
- **observer_start.md** incluant le `space-lua` de lancement du script et les règles CSS

Le dépôt contient ==d’autres fichiers utiles== :

- **observer_tests.md** pour tester vos règles. La page contient 22 tâches avec, chacune, 4 attributs environ, soit près de 90 attributs, dont près de 80 sont potentiellement “réparés” par l’observer (rappel : 1 seul attribut tient le rôle de “sentinelle”)

Deux versions précédentes du script JS, avec mesures, log et debug :
- **observer_old_avec_debug.js** version ancienne, ne gérant que des règles sommaires, sans argument
- **observer_new_avec_log.js** version récente, sans argument

De la documentation :
- **observer_doc.md** documentation générée avec Claude AI pour la version précédente, sans arguments
- **observer_publi.md** le présent fichier

### Installation

1- récupérez `observer.js` et posez-le dans Library (ou ailleurs mais, dans ce cas, modifiez le chemin dans le bloc `space-lua` d’import)
2- récupérez `observer_start.md` et intégrez-le à votre espace SilverBullet. Renommez le bloc “==lua==” en “==space-lua==” OU copiez son contenu dans l’un de vos `space-lua`.
3- adaptez à votre contexte les `règles CSS` définies dans le `space-lua` ainsi que le nom des attributs à traiter.
4- System Reload (ou Ctrl+Alt+r)

### Conseils

**Saisie** : il est parfois délicat de modifier le contenu d’un attribut après application des styles personnalisés, en particulier lorsque le `space-style` ci-dessous (facultatif) est activé, et surtout si les éléments de structure sont masqués. Avec un peu de pratique, on s’en sort facilement. En cas de difficulté, désactivez le `space-style` et/ou le script JS, modifiez et relancez.
Il est conseillé d’ajouter un caractère après le dernier attribut afin d’éviter des erreurs `lua` intempestives (non blocantes).

**Affichage** : dans certaines circonstances (très rares), le script semble inactif. Si cela se produit après un démarrage, il faut recharger la page (SilverBullet n’a pas démarré le script - cf console). Sinon, cliquez sur l’une des tâches et ressortez-en pour actualiser l’affichage.

**Issue** : merci de signaler vos retours d’expérience dans le discourse de la communauté (pas le github, que je ne sais pas bien utiliser).

# Complément

### Space-style

En complément à **observer.js**, ou indépendamment de lui, le `space-style` (PAS `space-lua`) ci-dessous modifie l’affichage de certains éléments descriptifs des tâches. Les règles sont activables séparément. Le bloc de style :

- masque les éléments de structure (les crochets) tout en conservant les deux-points
- supprime l’arrière-plan par défaut
- lorsque la tâche est cochée :
  - supprime le format “ligne barrée”
  - passe toutes les polices en gris moyen
  - passe tous les arrière-plans en gris clair
- montre le schéma à utiliser pour adapter les règles par page (intégration du nom d’une sous-classe de page définie dans le frontmatter)

### Utilisation

Copiez le bloc ci-dessous dans l’une de vos pages.
Remplacez le nom du bloc (`space` par `space-style`).

````space

/* *******  CUSTOMIZE TASK ATTRIBUTES ******* */

/* *******  Structural elements ******* */

/* Hide all structural elements
, .sb-line-task .sb-frontmatter.sb-atom*/
.sb-line-task .sb-frontmatter.sb-meta {
    display: none;
}

/* *******  Afficher les ":" (sb-meta contenant ": ") ******* */
.sb-line-task .sb-frontmatter.sb-meta:is(:has(+ .sb-frontmatter:not(.sb-meta):not(.sb-atom))) {
    display: inline;
}

/* *******  Neutraliser le line-through sur les valeurs cochées ******* */
#sb-main .cm-editor .cm-task-checked {
    text-decoration: none !important;
    font-weight: normal;
}

.cm-task-checked .sb-frontmatter{
      background: #F0F0F0; /*none;*/
      font-weight: normal;  /*bold;*/
      color:grey;
}

.cm-task-checked span.sb-task:nth-of-type(1) {
      color: grey ;
      font-weight: normal;  /*bold;*/
      background: #F0F0F0;
}

/* *******  Values ******* */

/* All values visible, without background */
.sb-line-task .sb-frontmatter:not(.sb-meta):not(.sb-atom) {
    display: inline;
    background: none; 
}

/* Personalization per page with
cssClasses created in frontmatter
(cf https://silverbullet.md/Page%20Decorations)
Example: .css-persoTask */
.css-persoTask .sb-line-task .sb-frontmatter:not(.sb-meta):not(.sb-atom){
    color: white;
    background: grey;
}

````

# Résultat
Exemple (voir : observer_tests.md) :
![[TECH/PROJETS/01/PAGE de TESTS.png]]



