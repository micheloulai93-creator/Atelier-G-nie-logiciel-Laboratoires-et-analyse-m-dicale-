# Comprendre le MCD et le MLD

Projet : logiciel de gestion des examens biologiques · Centre Médical Anne-Mathias, Grand-Bassam

Ce document explique les deux modèles de données du projet. Les modèles eux-mêmes sont dans :
- `mcd_mermaid_mocodo.md` : le MCD (modèle conceptuel de données) ;
- `mld_centre_medical_anne_mathias.md` : le MLD (modèle logique de données).

## 1. À quoi servent ces deux modèles

| | MCD | MLD |
| --- | --- | --- |
| **Nom complet** | Modèle conceptuel de données | Modèle logique de données |
| **Question posée** | *Quelles informations le système doit-il mémoriser, et comment sont-elles liées ?* | *Comment ranger ces informations dans une base de données relationnelle ?* |
| **Éléments** | Entités, associations, cardinalités | Tables, colonnes, clés primaires et étrangères |
| **Lien avec la technique** | Aucun (indépendant du logiciel de base de données) | Proche de SQL, mais encore sans type précis ni moteur |
| **Qui le lit** | Le client et l'équipe (vocabulaire métier) | Les développeurs |
| **Étape suivante** | Se transforme en MLD | Se transforme en script SQL (MPD) |

L'ordre de travail est : **CDC → MCD → MLD → base de données**.

## 2. Lire le MCD

### Entités

Une **entité** est une chose que le système doit mémoriser. Chaque entité a un identifiant (une valeur unique) et des attributs.

| Entité | Ce qu'elle représente | Identifiant |
| --- | --- | --- |
| PATIENT | Une personne ayant un dossier | `numero_dossier` |
| DEMANDE | Une demande d'examens, avec sa référence | `reference` |
| EXAMEN | Un examen du catalogue (par exemple NFS, glycémie) | `code_examen` |
| RESULTAT | La valeur obtenue pour un examen d'une demande | `id_resultat` |
| VALIDATION | La décision du responsable habilité sur un résultat | `id_validation` |
| COMPTE_RENDU | Le document généré à partir des résultats validés | `id_compte_rendu` |
| REMISE | La remise du compte rendu (physique ou numérique) | `id_remise` |
| UTILISATEUR | Un membre du personnel | `identifiant` |
| ROLE | Le rôle d'un utilisateur | `libelle` |

### Associations et cardinalités

Une **association** est un lien entre entités (verbe : *fait*, *contient*, *donne*). La **cardinalité** `(min, max)` dit combien de fois une entité participe à l'association.

| Association | Lecture | Règle du CDC |
| --- | --- | --- |
| PATIENT **fait** DEMANDE | Un patient fait 0 à n demandes. Une demande appartient à 1 seul patient. | RG03, RG04 |
| DEMANDE **contient** EXAMEN | Une demande contient 1 à n examens. Un examen peut figurer dans 0 à n demandes. | RG06 |
| DEMANDE **reçoit** RESULTAT | Une demande reçoit 0 à n résultats. Un résultat appartient à 1 seule demande. | RG09 |
| EXAMEN **porte sur** RESULTAT | Un résultat porte sur 1 seul examen. | RG09 |
| RESULTAT **est soumis à** VALIDATION | Un résultat peut avoir 0 à n validations. Une validation concerne 1 résultat. | RG11, BF24 |
| UTILISATEUR **effectue** VALIDATION | Un utilisateur effectue 0 à n validations. | BF24 |
| DEMANDE **donne** COMPTE_RENDU | Une demande donne 0 à n comptes rendus (versions). | BF27, BF31 |
| COMPTE_RENDU **est remis par** REMISE | Un compte rendu est remis par 0 à n remises. | RG17, RG24 |
| ROLE **est attribué à** UTILISATEUR | Un rôle est attribué à 0 à n utilisateurs. Un utilisateur a 1 seul rôle. | RG27 |

Exemple de lecture de `0N PATIENT, 11 DEMANDE` : côté patient, « 0N » signifie qu'un patient peut n'avoir aucune ou plusieurs demandes. Côté demande, « 11 » signifie qu'elle a obligatoirement un et un seul patient.

### Cas particulier : une association qui porte des attributs

L'association DEMANDE — EXAMEN est de type **n,n** (plusieurs à plusieurs). Elle porte ses propres informations : `statut_prelevement` et `statut_realisation` (BF16, BF17). Ces statuts ne dépendent ni de la demande seule ni de l'examen seul, mais de **la combinaison des deux**.

## 3. Passer du MCD au MLD : les règles

| Cas dans le MCD | Règle | Exemple dans ce projet |
| --- | --- | --- |
| **Entité** | Devient une **table**. L'identifiant devient la clé primaire (PK). | PATIENT devient la table `PATIENT` avec PK `numero_dossier`. |
| Association **1,1 — 0,n** (ou 1,n) | La clé primaire du côté « n » **reçoit une clé étrangère** (FK) vers le côté « 1 ». Aucune nouvelle table. | `DEMANDE.numero_dossier` pointe vers `PATIENT`. |
| Association **n,n** | Devient une **table de liaison** dont la PK est composée des deux clés. Les attributs de l'association y sont ajoutés. | `LIGNE_DEMANDE` (`reference` + `code_examen`) avec `statut_prelevement` et `statut_realisation`. |
| Association **n,n** sans attribut | Même règle : table de liaison avec les deux clés. | `ROLE_PERMISSION`. |
| Association portant des attributs en 1,n | Les attributs vont dans la table du côté « n ». | Le motif d'une validation est dans `VALIDATION`. |

Ce que le MLD apporte en plus du MCD :
- les **clés étrangères** (`#numero_dossier`, `#id_resultat`, etc.) ;
- les **tables de liaison** ;
- les **contraintes** à faire respecter par la base (unicité, valeurs obligatoires).

## 4. Correspondance entre les deux modèles

| MCD (entité ou association) | MLD (table) | Remarque |
| --- | --- | --- |
| PATIENT | `PATIENT` | — |
| DEMANDE + « fait » | `DEMANDE` | `numero_dossier` en clé étrangère |
| EXAMEN | `EXAMEN` | catalogue |
| « contient » (DEMANDE — EXAMEN) | `LIGNE_DEMANDE` | association n,n devenue table |
| RESULTAT + « reçoit » + « porte sur » | `RESULTAT` | clé étrangère composite vers `LIGNE_DEMANDE` |
| VALIDATION + associations | `VALIDATION` | FK vers `RESULTAT` et `UTILISATEUR` |
| COMPTE_RENDU + « donne » | `COMPTE_RENDU` | FK vers `DEMANDE` |
| REMISE + « est remis par » | `REMISE` | physique et numérique regroupées |
| ROLE, UTILISATEUR | `ROLE`, `UTILISATEUR` | FK `id_role` |
| « accorde » (ROLE — PERMISSION) | `ROLE_PERMISSION` | association n,n devenue table |
| — | `CONTACT_PATIENT`, `NOTIFICATION`, `CODE_VERIFICATION`, `CORRECTION_RESULTAT`, `JOURNAL_OPERATION`, `PERMISSION` | détaillées dans les MCD-B et MCD-C |

## 5. Exemple concret

Une patiente, **Kouassi Aya**, est enregistrée avec le dossier `DOS-2026-00418`. Elle présente un bulletin pour une NFS et une glycémie.

1. `PATIENT` contient une ligne : `DOS-2026-00418`.
2. Une ligne est ajoutée à `DEMANDE` : `DEM-2026-001253`, avec `numero_dossier = DOS-2026-00418`.
3. Deux lignes sont ajoutées à `LIGNE_DEMANDE` : (`DEM-2026-001253`, NFS) et (`DEM-2026-001253`, glycémie).
4. Le laboratoire renvoie la fiche papier. La réceptionniste saisit deux lignes dans `RESULTAT`, chacune rattachée à une ligne de demande.
5. Le responsable habilité valide : une ligne est ajoutée à `VALIDATION` pour chaque résultat.
6. Le compte rendu est généré dans `COMPTE_RENDU`, puis une ligne `REMISE` enregistre la remise, physique ou numérique.

(Ces données viennent des maquettes de l'interface. Ce sont des données fictives.)

## 6. Points à valider avec votre enseignant ou la clinique

- **Notation du MCD** : l'enseignant attend peut-être un MCD Merise dessiné avec des ellipses d'associations. Le fichier Mocodo permet d'en produire un.
- **Remise physique et numérique** : une seule table (choix actuel) ou une table par type.
- **Valeurs de référence** : à configurer par une personne autorisée, donc potentiellement une table dédiée.
- **Statuts** : les libellés sont des propositions, à confirmer avec la clinique.
- **Acteur Administrateur** : absent du CDC, il explique la présence des tables `ROLE` et `PERMISSION`. À confirmer.

## 7. Vocabulaire

| Terme | Définition |
| --- | --- |
| Entité | Objet du monde réel à mémoriser (patient, demande…) |
| Attribut | Information décrivant une entité (nom, date de naissance…) |
| Identifiant | Attribut dont la valeur est unique pour chaque occurrence |
| Association | Lien entre entités, souvent exprimé par un verbe |
| Cardinalité | Nombre minimum et maximum de participations à une association |
| Clé primaire (PK) | Colonne qui identifie de façon unique chaque ligne d'une table |
| Clé étrangère (FK) | Colonne qui référence la clé primaire d'une autre table |
| Table de liaison | Table qui représente une association n,n |
| Intégrité référentielle | Garantie qu'une clé étrangère pointe toujours vers une ligne existante |
