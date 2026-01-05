
### Contexte
22 tâches comportant chacune 4 attributs => 88 attributs.
Sur ces 88 attributs, 10 ne sont pas des cibles et 78 le sont.
L’ordre des attributs varie entre les tâches.

### Task list (dynamic styling)

- [ ] TODO [date: A ] [statut: en attente]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] - faire ceci
- [x] TODO💓 [date: A ] [statut: en attente]   [attrib2: 2025-12-29]
      faire ceci et, pourquoi pas, encore cela ... et patati, ... et patata ... [attrib1: 2025-12-27] -
- [x] TODO [attrib1: A ] [attrib2: true]   [attrib1: 2025-12-27]   [date: 2025-12-29] -
- [ ] TODO  [statut: en attente]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
      écrire un roman qui raconte l’histoire d’un mec en 2026. Science fiction ?  [date: 😀 c'est long à faire mais j'y arriverai. Promis, juré🏖️ ] 
- [ ] TODO [date: A ] [date: true]   [date: 2025-12-27]   [statut: hors délai] -
- [ ] TODO☠️ [datedatedate: A ] [statut: true]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO🙃 [date: A ] [statut: en cours]   [statut: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [date: A ] [statut: en cours]   [attrib2: 2025-12-27]   [attrib1: 2025-12-29] - 🥶
- [x] TODO [date: A ] [statutstatutstatut: true]   [attrib2: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [date: A ] [statut: en attente]   💚 [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TOD🥸O [date: A ] [statut: hors délai]   [statutattrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [date: A ] [Vstatut: true]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [ppdate: A ] [statut: hors délai]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [x] TODO [datedatedate: A ] [statut: true]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [date: A ] [statut: en cours]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [attrib2: A ] [statut: hors délai]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [attrib1: A ] [ssssssstatut: true]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [date: A ] [statut: en attente]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [date: A ] [statut: en cours]   [attrib1: 2025-12-27]   [attrib0: 2025-12-29] -
- [x] TODO [datedatedate: A ] [statut: true]   [attrib2: 2025-12-27]   [attrib0: 2025-12-29] -
- [ ] TODO [date: A ] [date: true]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -
- [ ] TODO [date: A ] [date: true]   [attrib1: 2025-12-27]   [attrib2: 2025-12-29] -

# Test de charge
Log édité toutes les 15 secondes pendant une période d’observation de 45 secondes.
Les actions effectuées sur la page au cours de chaque intervalle sont signalées.

Point de départ : la liste des tâches est masquée (paragraphe replié)
23:42:16,902 📊 Stats Observer Multi-Attributs:
23:42:16,903   ⏱️  Uptime: 780.7s
23:42:16,903   🎯 Éléments surveillés: 0
23:42:16,904   🔄 Mutations traitées: 0
23:42:16,904   ✔️ Mutations réparées: 0
23:42:16,904   📈 Mutations/sec: 0.00
23:42:16,904   📉 Réparations/sec: 0.00

1ère action : le paragraphe est déplié => 2 maj par élément surveillé
23:42:31,913 📊 Stats Observer Multi-Attributs:
23:42:31,914   ⏱️  Uptime: 795.7s
23:42:31,915   🎯 Éléments surveillés: 78
23:42:31,915   🔄 Mutations traitées: 2
23:42:31,915   ✔️ Mutations réparées: 156
23:42:31,915   📈 Mutations/sec: 0.13
23:42:31,915   📉 Réparations/sec: 10.39

2ème action : clic dans la page => 1 maj par élément surveillé
23:42:46,935 📊 Stats Observer Multi-Attributs:
23:42:46,938   ⏱️  Uptime: 810.7s
23:42:46,938   🎯 Éléments surveillés: 78
23:42:46,938   🔄 Mutations traitées: 1
23:42:46,938   ✔️ Mutations réparées: 78
23:42:46,938   📈 Mutations/sec: 0.07
23:42:46,938   📉 Réparations/sec: 5.19

repos : ni clic, ni scroll (le paragraphe est déplié) : 0 maj sur la sentinelle
23:43:01,942 📊 Stats Observer Multi-Attributs:
23:43:01,943   ⏱️  Uptime: 825.7s
23:43:01,943   🎯 Éléments surveillés: 78
23:43:01,943   🔄 Mutations traitées: 0
23:43:01,944   ✔️ Mutations réparées: 0
23:43:01,944   📈 Mutations/sec: 0.00
23:43:01,944   📉 Réparations/sec: 0.00

#### Afficher la tâche qui occupe la position 321 dans la page:
(cette tâche comporte deux lignes)
${query[[from index.tag "task"  where  page == editor.getCurrentPage() and pos == 321]]}

#### Afficher toutes les tâches de la page, triées par ordre croissant de position:
${query[[from index.tag "task"  where  page == editor.getCurrentPage() order by pos]]}