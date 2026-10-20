# CAHIER DES CHARGES
## Conception et développement d’un logiciel de gestion des examens biologiques et de transmission sécurisée des résultats médicaux

**Module :** Atelier du Génie Logiciel  
**Structure d’étude :** Clinique Anne Mathias  
**Localisation :** Grand-Bassam, Côte d’Ivoire  
**Version :** 1.0 — Document de travail

---

## Sommaire

1. [Présentation générale du projet](#1-présentation-générale-du-projet)
2. [Objectifs du projet](#2-objectifs-du-projet)
3. [Périmètre du projet](#3-périmètre-du-projet)
4. [Acteurs du système](#4-acteurs-du-système)
5. [Besoins fonctionnels](#5-besoins-fonctionnels)
6. [Besoins non fonctionnels](#6-besoins-non-fonctionnels)
7. [Règles de gestion](#7-règles-de-gestion)
8. [Scénario général de fonctionnement](#8-scénario-général-de-fonctionnement)
9. [Gestion des erreurs et cas particuliers](#9-gestion-des-erreurs-et-cas-particuliers)
10. [Contraintes techniques et organisationnelles](#10-contraintes-techniques-et-organisationnelles)
11. [Critères de validation du projet](#11-critères-de-validation-du-projet)
12. [Évolutions possibles](#12-évolutions-possibles)
13. [Conclusion](#13-conclusion)

---

# 1. Présentation générale du projet

## 1.1. Contexte

Dans le cadre du module **Atelier du Génie Logiciel**, ce projet porte sur la conception et le développement d’un logiciel de gestion des examens biologiques et de transmission sécurisée des résultats médicaux. L’étude est menée dans le contexte de la Clinique Anne Mathias, située à Grand-Bassam, en Côte d’Ivoire.

Le projet vise à améliorer le suivi des demandes d’examens, l’enregistrement des résultats et leur remise aux patients, au moyen d’une application adaptée aux activités de l’accueil et du laboratoire.

## 1.2. Situation actuelle

Le fonctionnement décrit pour la structure s’organise autour des étapes suivantes :

1. Le patient se présente à l’accueil avec un bulletin d’examens.
2. La réceptionniste recherche son dossier ou en crée un nouveau s’il n’existe pas.
3. Elle enregistre les examens demandés et remet au patient une fiche comportant son numéro de dossier et les informations nécessaires.
4. Le patient présente cette fiche au laborantin.
5. Le laborantin effectue les prélèvements et les analyses, puis inscrit les résultats sur la fiche papier.
6. La fiche est transmise à l’accueil.
7. La réceptionniste retrouve le dossier correspondant et saisit les résultats dans le logiciel.
8. Les résultats sont ensuite remis au patient, soit physiquement, soit numériquement selon son choix.

Ce fonctionnement implique la circulation de fiches papier et la retranscription des résultats. Le projet vise à centraliser les informations, faciliter le suivi des examens et proposer une transmission numérique sécurisée en complément de la remise physique.

## 1.3. Problématique

**Comment concevoir un logiciel permettant de centraliser les dossiers des patients et les demandes d’examens, de suivre les résultats et de faciliter leur remise sécurisée, par voie physique ou numérique ?**

## 1.4. Solution envisagée

La solution consiste à développer une application permettant de :

- créer et rechercher les dossiers des patients ;
- enregistrer les demandes d’examens biologiques ;
- générer une fiche de laboratoire identifiée par une référence ;
- suivre l’état d’avancement des examens ;
- saisir dans le logiciel les résultats inscrits sur les fiches papier ;
- gérer le statut de validation des résultats ;
- générer et imprimer les comptes rendus ;
- notifier les patients ayant choisi la réception numérique ;
- permettre aux patients de consulter et de télécharger leurs résultats après vérification sécurisée de leur identité ;
- suivre les remises physiques et numériques.

## 1.5. Utilisateurs et environnement

Le logiciel interne est principalement destiné au personnel d’accueil. Le laborantin continue à réaliser les analyses et à inscrire les résultats sur la fiche papier. Le portail patient constitue un espace distinct permettant aux patients autorisés d’accéder à leurs comptes rendus numériques.

---

# 2. Objectifs du projet

## 2.1. Objectif général

Concevoir et développer une application informatique permettant d’améliorer la gestion des examens biologiques, depuis l’enregistrement de la demande jusqu’à la remise sécurisée des résultats au patient.

## 2.2. Objectifs spécifiques

Le logiciel devra permettre de :

1. Enregistrer et retrouver les dossiers des patients.
2. Enregistrer les demandes d’examens biologiques.
3. Associer chaque examen au patient et à la demande correspondante.
4. Faciliter le suivi des prélèvements et des analyses.
5. Enregistrer les résultats dans le logiciel à partir des fiches transmises par le laboratoire.
6. Contrôler le statut de validation des résultats avant leur remise.
7. Générer et imprimer les comptes rendus médicaux.
8. Envoyer une notification aux patients ayant choisi la réception numérique.
9. Permettre la consultation et le téléchargement sécurisés des résultats.
10. Assurer la traçabilité des opérations importantes et préserver la confidentialité des données médicales.

---

# 3. Périmètre du projet

## 3.1. Fonctionnalités incluses

Le périmètre initial comprend :

- la création et la recherche des dossiers patients ;
- l’enregistrement des demandes d’examens ;
- la génération d’une fiche de laboratoire comportant des références ;
- le suivi des examens et des prélèvements ;
- la saisie des résultats à l’accueil ;
- la gestion du statut de validation des résultats ;
- la génération et l’impression des comptes rendus ;
- la notification des patients ;
- le portail sécurisé de consultation des résultats ;
- le suivi des remises physiques et numériques ;
- la gestion des accès et la traçabilité des opérations.

## 3.2. Fonctionnalités exclues du périmètre initial

Le projet ne vise pas à gérer l’ensemble des activités de la clinique. Sont exclus de la première version :

- la gestion générale des consultations médicales ;
- la gestion des hospitalisations et des rendez-vous ;
- la gestion de la pharmacie et des stocks de médicaments ;
- la comptabilité générale de la clinique ;
- la gestion complète des assurances et des remboursements ;
- l’automatisation des analyses biologiques par des appareils de laboratoire.

L’intégration technique avec le logiciel déjà utilisé par la clinique pourra être étudiée ultérieurement, selon les possibilités disponibles.

---

# 4. Acteurs du système

| Acteur | Rôle et responsabilités |
|---|---|
| **Réceptionniste** | Créer et rechercher les dossiers, enregistrer les demandes, produire les fiches, saisir les résultats reçus et organiser leur remise. |
| **Laborantin** | Réaliser les prélèvements et les analyses, inscrire les résultats sur la fiche papier et transmettre cette fiche à l’accueil. |
| **Patient** | Fournir les informations nécessaires, choisir le mode de réception et, s’il choisit le numérique, consulter ou télécharger ses résultats sur le portail. |
| **Responsable habilité à valider** | Vérifier et valider les résultats lorsque cette responsabilité est distincte de celle du laborantin, conformément aux procédures de la clinique. |

Le patient intervient dans le système global par le portail numérique, mais n’a pas nécessairement accès au logiciel interne de l’accueil.

> **Point à confirmer avec la clinique :** la personne responsable de la validation définitive des résultats et les procédures à appliquer avant leur transmission au patient.

---

# 5. Besoins fonctionnels

Les besoins fonctionnels décrivent les services que le logiciel doit fournir. Ils sont regroupés par module afin de faciliter la conception, le développement et les tests.

## 5.1. Module de gestion des patients

| Référence | Besoin fonctionnel | Description |
|---|---|---|
| BF01 | Créer un dossier patient | Le système doit permettre à la réceptionniste d’enregistrer un nouveau patient. |
| BF02 | Générer un numéro de dossier | Le système doit attribuer automatiquement un identifiant unique à chaque nouveau patient. |
| BF03 | Rechercher un patient | Le système doit permettre de retrouver un patient à partir de son numéro de dossier ou de ses informations d’identité. |
| BF04 | Consulter un dossier | Le système doit afficher les informations d’identification et l’historique des examens du patient. |
| BF05 | Vérifier les doublons | Le système doit signaler les dossiers potentiellement identiques avant la création d’un nouveau dossier. |
| BF06 | Mettre à jour les coordonnées | Le système doit permettre de modifier les coordonnées du patient aux utilisateurs autorisés et de conserver une trace des modifications importantes. |

## 5.2. Module de gestion des demandes d’examens

| Référence | Besoin fonctionnel | Description |
|---|---|---|
| BF07 | Enregistrer une demande | Le système doit permettre d’enregistrer une demande à partir du bulletin d’examens présenté par le patient. |
| BF08 | Sélectionner les examens | La réceptionniste doit pouvoir sélectionner un ou plusieurs examens dans un catalogue. |
| BF09 | Générer une référence de demande | Le système doit attribuer une référence unique à chaque demande d’examens. |
| BF10 | Enregistrer la date de demande | Le système doit enregistrer la date de création de la demande. |
| BF11 | Enregistrer le mode de réception | Le système doit permettre d’enregistrer le choix du patient : remise physique ou numérique. |
| BF12 | Enregistrer les coordonnées de réception | Le système doit permettre d’enregistrer le numéro de téléphone et, si nécessaire, l’adresse e-mail destinée aux notifications. |
| BF13 | Produire une fiche de laboratoire | Le système doit générer une fiche contenant le numéro de dossier, la référence de la demande et la liste des examens concernés. |
| BF14 | Consulter les demandes | Le système doit afficher les demandes associées à un patient et leur état d’avancement. |

## 5.3. Module de suivi des prélèvements et des examens

| Référence | Besoin fonctionnel | Description |
|---|---|---|
| BF15 | Consulter les examens à traiter | Le système doit permettre de retrouver les demandes enregistrées et les examens qui restent à réaliser. |
| BF16 | Suivre le prélèvement | Le système doit permettre de suivre le statut du prélèvement lorsqu’il est nécessaire pour l’examen. |
| BF17 | Suivre la réalisation | Le système doit permettre de distinguer les examens en attente, en cours et terminés. |
| BF18 | Identifier les examens incomplets | Le système doit signaler les examens dont les résultats ne sont pas encore enregistrés ou dont le traitement n’est pas terminé. |
| BF19 | Retrouver une demande à partir de sa référence | Le système doit permettre de retrouver rapidement la demande correspondant à la fiche papier transmise par le laboratoire. |

Le logiciel assure le suivi informatique des examens. La réalisation physique des prélèvements et des analyses demeure sous la responsabilité du personnel du laboratoire.

## 5.4. Module de saisie et de gestion des résultats

| Référence | Besoin fonctionnel | Description |
|---|---|---|
| BF20 | Saisir les résultats | La réceptionniste doit pouvoir enregistrer les résultats à partir de la fiche papier retournée par le laboratoire. |
| BF21 | Associer les résultats aux examens | Le système doit associer chaque résultat à l’examen, à la demande et au patient correspondants. |
| BF22 | Contrôler les champs obligatoires | Le système doit signaler les données manquantes avant l’enregistrement définitif des résultats. |
| BF23 | Enregistrer les résultats | Le système doit conserver les résultats saisis et permettre de les retrouver ultérieurement. |
| BF24 | Gérer la validation | Le système doit permettre d’identifier les résultats en attente de validation, validés ou retournés pour correction. |
| BF25 | Gérer les corrections | Le système doit permettre les corrections par les personnes autorisées et conserver la trace des modifications importantes. |
| BF26 | Identifier les résultats disponibles | Le système doit afficher les examens dont les résultats ont été enregistrés et dont les validations requises ont été effectuées. |

**Important :** la saisie des résultats par la réceptionniste ne constitue pas, à elle seule, une validation médicale. Le logiciel devra respecter la procédure de validation applicable au laboratoire.

## 5.5. Module de génération et d’impression des comptes rendus

| Référence | Besoin fonctionnel | Description |
|---|---|---|
| BF27 | Générer un compte rendu | Le système doit produire un compte rendu à partir des résultats enregistrés et validés. |
| BF28 | Présenter les informations du patient | Le compte rendu doit comporter les informations nécessaires à l’identification du patient et de la demande. |
| BF29 | Présenter les résultats | Le document doit présenter les examens, les résultats, les unités et les autres informations nécessaires selon le type d’analyse. |
| BF30 | Imprimer un compte rendu | Le système doit permettre d’imprimer les résultats pour leur remise physique. |
| BF31 | Retrouver un ancien compte rendu | Le système doit permettre de retrouver les comptes rendus précédemment générés, selon les autorisations d’accès. |

## 5.6. Module de transmission numérique des résultats

| Référence | Besoin fonctionnel | Description |
|---|---|---|
| BF32 | Déclencher l’envoi des résultats | La réceptionniste doit pouvoir déclencher la transmission numérique après que les résultats ont été validés et rendus disponibles. |
| BF33 | Envoyer une notification | Le système doit envoyer un SMS ou un e-mail informant le patient que ses résultats sont disponibles. |
| BF34 | Fournir un lien sécurisé | La notification doit contenir un lien permettant d’accéder au portail de consultation sécurisé. |
| BF35 | Vérifier l’identité du patient | Le portail doit demander les informations prévues pour retrouver le dossier et vérifier leur correspondance. |
| BF36 | Envoyer un code de vérification | Après une première vérification réussie, le système doit envoyer un code à usage unique au numéro déjà enregistré et vérifié dans le dossier. |
| BF37 | Vérifier le code | Le système doit contrôler la validité et l’expiration du code avant d’autoriser l’accès. |
| BF38 | Afficher les résultats | Le portail doit permettre au patient authentifié de consulter les comptes rendus validés qui lui sont destinés. |
| BF39 | Télécharger les résultats | Le portail doit permettre de télécharger le compte rendu au format PDF. |
| BF40 | Suivre la transmission numérique | Le système doit enregistrer les états disponibles, tels que notification envoyée, échec d’envoi, consultation ou téléchargement, lorsque ces événements sont observables. |

Le message de notification ne doit pas contenir directement les résultats médicaux. Le lien d’accès doit être protégé et le système doit limiter les tentatives de vérification afin de prévenir les accès abusifs.

## 5.7. Module de remise physique des résultats

| Référence | Besoin fonctionnel | Description |
|---|---|---|
| BF41 | Identifier les résultats à remettre | Le système doit permettre de retrouver les résultats validés dont la remise physique reste à effectuer. |
| BF42 | Signaler la disponibilité | Le système doit permettre à la réceptionniste d’identifier les patients à contacter lorsque leurs résultats sont disponibles. |
| BF43 | Enregistrer le contact du patient | Le système doit permettre de suivre le contact effectué en vue du retrait des résultats, selon les moyens disponibles. |
| BF44 | Enregistrer la remise physique | La réceptionniste doit pouvoir enregistrer la date de remise et l’identité du personnel ayant effectué l’opération. |
| BF45 | Mettre à jour le statut de remise | Le système doit distinguer les résultats disponibles, en attente de retrait et effectivement remis. |

## 5.8. Module de sécurité et de traçabilité

| Référence | Besoin fonctionnel | Description |
|---|---|---|
| BF46 | Authentifier les utilisateurs | Le système doit exiger une connexion pour accéder au logiciel interne. |
| BF47 | Gérer les autorisations | Le système doit limiter les fonctionnalités accessibles selon les responsabilités des utilisateurs. |
| BF48 | Enregistrer les opérations importantes | Le système doit tracer les créations, modifications, validations et remises de résultats. |
| BF49 | Gérer les sessions | Le système doit permettre la déconnexion et appliquer des règles de sécurité aux sessions. |
| BF50 | Protéger les données médicales | Le système doit empêcher les consultations et transmissions par des personnes non autorisées. |

---

# 6. Besoins non fonctionnels

Les besoins non fonctionnels précisent les critères de qualité, de sécurité et de fonctionnement auxquels le logiciel devra répondre.

| Référence | Catégorie | Exigence |
|---|---|---|
| BNF01 | Sécurité | Les accès au logiciel interne doivent être protégés par une authentification. |
| BNF02 | Confidentialité | Les données médicales doivent être accessibles uniquement aux personnes autorisées. |
| BNF03 | Intégrité | Les résultats doivent rester associés au bon patient, à la bonne demande et au bon examen. |
| BNF04 | Fiabilité | Le système doit enregistrer les informations de manière cohérente et signaler clairement les erreurs. |
| BNF05 | Performance | Les recherches courantes de dossiers et de demandes doivent s’effectuer dans un délai acceptable. Une cible initiale de deux secondes pourra être retenue pour les tests sur un volume de données défini. |
| BNF06 | Ergonomie | L’interface doit être claire, cohérente et facile à utiliser par la réceptionniste et les autres utilisateurs autorisés. |
| BNF07 | Disponibilité | Le logiciel doit être accessible pendant les périodes de fonctionnement prévues, sous réserve de la disponibilité du matériel et du réseau. |
| BNF08 | Sauvegarde | La base de données doit faire l’objet de sauvegardes régulières et la restauration doit être testée. |
| BNF09 | Traçabilité | Les opérations sensibles doivent être journalisées dans des journaux protégés contre les modifications non autorisées. |
| BNF10 | Maintenabilité | Le code doit être organisé en modules afin de faciliter la correction des erreurs et l’ajout de fonctionnalités. |
| BNF11 | Compatibilité | Le logiciel doit fonctionner sur les systèmes et navigateurs retenus pour le déploiement. |
| BNF12 | Évolutivité | Le système doit permettre l’ajout de nouveaux examens et de nouvelles fonctionnalités sans refonte complète. |
| BNF13 | Protection des échanges | Les échanges entre le portail patient et le serveur doivent être protégés par HTTPS en production. |
| BNF14 | Protection des accès numériques | Les codes temporaires doivent expirer, les tentatives doivent être limitées et les sessions doivent être protégées. |
| BNF15 | Fiabilité des notifications | Le système doit gérer les échecs d’envoi des SMS et des e-mails et permettre leur identification. |
| BNF16 | Fiabilité des documents | Le compte rendu généré doit correspondre aux résultats validés enregistrés dans le système. |
| BNF17 | Confidentialité physique | Les comptes rendus imprimés doivent être conservés et remis de manière à limiter l’accès par des personnes non autorisées. |
| BNF18 | Conformité | La solution devra respecter les exigences applicables en Côte d’Ivoire relatives aux données personnelles et aux données de santé. |

Les exigences de performance devront être vérifiées pendant les tests. Les délais exacts, la fréquence des sauvegardes et les durées de conservation seront précisés selon les contraintes de la clinique.

---

# 7. Règles de gestion

Les règles de gestion définissent les conditions que le logiciel doit obligatoirement respecter, indépendamment de la manière dont les écrans seront conçus.

## 7.1. Règles relatives aux patients et aux demandes

| Référence | Règle de gestion |
|---|---|
| RG01 | Chaque patient doit posséder un numéro de dossier unique. |
| RG02 | Avant de créer un nouveau dossier, la réceptionniste doit rechercher si le patient possède déjà un dossier. |
| RG03 | Chaque demande d’examens doit être associée à un seul dossier patient. |
| RG04 | Un patient peut posséder plusieurs demandes d’examens au cours du temps. |
| RG05 | Chaque demande doit posséder une référence unique permettant de la retrouver indépendamment des autres demandes du patient. |
| RG06 | Une demande peut contenir un ou plusieurs examens. |
| RG07 | Le mode de réception des résultats doit être enregistré pour chaque demande. |
| RG08 | La fiche de laboratoire doit comporter le numéro du dossier patient, la référence de la demande et la liste des examens concernés. |

## 7.2. Règles relatives aux résultats

| Référence | Règle de gestion |
|---|---|
| RG09 | Un résultat doit être associé à un examen précis et à la demande correspondante. |
| RG10 | Les résultats sont saisis à l’accueil à partir de la fiche papier transmise par le laboratoire. |
| RG11 | Un résultat ne peut pas être considéré comme définitif tant que les validations requises ne sont pas effectuées. |
| RG12 | Un résultat incomplet ne peut pas être validé définitivement si des informations obligatoires manquent. |
| RG13 | Toute correction importante apportée à un résultat doit être effectuée par une personne autorisée et conserver une trace de la modification. |
| RG14 | Le système doit distinguer les résultats en cours de saisie, en attente de validation, validés et disponibles pour la remise. |
| RG15 | La réceptionniste ne doit pas pouvoir modifier librement un résultat déjà validé sans suivre la procédure de correction autorisée. |

## 7.3. Règles relatives à la remise des résultats

| Référence | Règle de gestion |
|---|---|
| RG16 | Seuls les résultats ayant satisfait aux exigences de validation peuvent être transmis comme définitifs. |
| RG17 | La remise physique et la remise numérique doivent être suivies séparément. |
| RG18 | Pour une remise numérique, le système doit vérifier les informations du patient et envoyer un code à usage unique au numéro de téléphone déjà vérifié. |
| RG19 | Le code de vérification doit avoir une durée de validité limitée et ne doit pas pouvoir être réutilisé après son utilisation ou son expiration. |
| RG20 | Le patient ne doit accéder qu’aux comptes rendus qui lui sont destinés et dont la consultation est autorisée. |
| RG21 | Pour une remise physique, l’identité du patient ou l’autorisation de son représentant doit être vérifiée avant la remise. |
| RG22 | L’impression d’un compte rendu ne signifie pas que celui-ci a été remis au patient. |
| RG23 | L’envoi d’une notification ne signifie pas que le patient a consulté ou téléchargé ses résultats. |
| RG24 | La date et le mode de remise doivent être enregistrés lorsque la remise est effectivement réalisée. |
| RG25 | En cas d’échec d’envoi d’une notification, le système doit conserver un statut d’échec et permettre un suivi. |

## 7.4. Règles relatives à la sécurité

| Référence | Règle de gestion |
|---|---|
| RG26 | L’accès au logiciel interne nécessite une authentification. |
| RG27 | Chaque utilisateur ne peut effectuer que les opérations autorisées par son rôle. |
| RG28 | Les informations médicales ne doivent pas être communiquées dans les notifications SMS ou e-mail. |
| RG29 | Les accès et les opérations sensibles doivent être tracés. |
| RG30 | Les comptes rendus et les dossiers doivent être protégés contre les accès non autorisés. |
| RG31 | Les sauvegardes doivent être protégées et leur restauration doit pouvoir être vérifiée. |

---

# 8. Scénario général de fonctionnement

Le scénario suivant décrit le fonctionnement nominal du logiciel depuis l’arrivée du patient jusqu’à la remise de ses résultats.

1. Le patient se présente à l’accueil avec son bulletin d’examens.
2. La réceptionniste recherche son dossier dans le logiciel.
3. Si aucun dossier correspondant n’existe, elle crée un nouveau dossier et le système génère un numéro unique.
4. Elle enregistre la demande, sélectionne les examens et enregistre le mode de réception souhaité.
5. Le système génère une fiche de laboratoire que le patient présente au laborantin.
6. Le laborantin effectue les prélèvements et les analyses, inscrit les résultats sur la fiche papier et la transmet à l’accueil.
7. La réceptionniste recherche la demande à partir de sa référence et saisit les résultats dans le logiciel.
8. Les résultats suivent le processus de vérification et de validation prévu par la clinique.
9. Lorsque les résultats sont validés, la réceptionniste ou le système déclenche la procédure de remise correspondant au choix du patient.
10. Si le patient a choisi le numérique, il reçoit une notification, vérifie son identité et accède à son compte rendu après authentification.
11. Si le patient a choisi la remise physique, il est contacté pour venir retirer son compte rendu à l’accueil.
12. Le système enregistre la remise effective et conserve l’historique de la demande et des résultats.

---

# 9. Gestion des erreurs et cas particuliers

Le logiciel doit également gérer les situations anormales afin de limiter les erreurs de traitement et les accès non autorisés.

| Situation | Comportement attendu |
|---|---|
| Patient introuvable | Permettre la création d’un dossier après vérification préalable. |
| Patient déjà enregistré | Afficher le dossier existant afin d’éviter un doublon. |
| Référence de fiche incorrecte | Signaler l’erreur et empêcher l’association des résultats à une demande non identifiée. |
| Résultat manquant | Signaler que la demande est incomplète et empêcher sa finalisation prématurée. |
| Résultat non validé | Interdire sa remise comme résultat définitif. |
| Mauvais code de vérification | Refuser l’accès et appliquer une limitation des tentatives. |
| Code expiré | Demander une nouvelle procédure de vérification. |
| Échec d’envoi du SMS ou de l’e-mail | Enregistrer l’échec et permettre le suivi de la notification. |
| Patient ayant choisi la remise physique | Afficher les résultats en attente de retrait et permettre le suivi du contact. |
| Tentative d’accès non autorisé | Refuser l’accès et enregistrer l’événement de sécurité pertinent. |

---

# 10. Contraintes techniques et organisationnelles

Le développement devra tenir compte des contraintes suivantes :

- Le personnel doit pouvoir retrouver rapidement les dossiers et les demandes.
- Le numéro de dossier et la référence de demande doivent être clairement visibles sur la fiche de laboratoire.
- L’application doit permettre la saisie des résultats à partir du document papier utilisé par le laboratoire.
- La génération des comptes rendus doit être compatible avec l’impression.
- La remise numérique nécessite un service de notification SMS ou e-mail et une infrastructure sécurisée pour le portail patient.
- Le fonctionnement du portail doit être testé sur les appareils et navigateurs retenus.
- Les données médicales doivent être sauvegardées et protégées.
- Les procédures de validation et de remise doivent correspondre aux responsabilités réellement appliquées par la clinique.

Les technologies de développement, l’hébergement et le prestataire SMS restent à choisir selon les contraintes du projet et les moyens disponibles.

---

# 11. Critères de validation du projet

Le projet pourra être considéré comme fonctionnel lorsque les principaux scénarios suivants auront été testés avec succès.

- [ ] La création et la recherche d’un patient fonctionnent sans créer de doublons évidents.
- [ ] Une demande peut contenir plusieurs examens et produire une fiche identifiable.
- [ ] La réceptionniste peut retrouver une demande à partir de la référence de la fiche papier.
- [ ] Les résultats saisis sont correctement associés au patient et aux examens.
- [ ] Un résultat non validé ne peut pas être remis comme définitif.
- [ ] Un compte rendu validé peut être généré et imprimé.
- [ ] Un patient ayant choisi le numérique peut recevoir une notification, vérifier son identité et consulter ou télécharger ses résultats.
- [ ] Un patient ayant choisi la remise physique peut être contacté et sa remise enregistrée.
- [ ] Les tentatives d’accès non autorisées sont bloquées.
- [ ] Les opérations importantes sont tracées et les données peuvent être sauvegardées puis restaurées.

---

# 12. Évolutions possibles

Après la réalisation du périmètre initial, le logiciel pourrait évoluer vers :

- l’intégration avec le logiciel déjà utilisé par la clinique ;
- la saisie directe des résultats par le laboratoire, si l’organisation et les équipements le permettent ;
- l’automatisation de certaines notifications ;
- l’amélioration du suivi des prélèvements et des analyses ;
- la mise en place de statistiques sur l’activité du laboratoire.

Ces évolutions ne sont pas indispensables à la première version du projet.

---

# 13. Conclusion

Le projet vise à concevoir un logiciel de gestion des examens biologiques qui améliore l’organisation du travail entre l’accueil et le laboratoire. Il permet de centraliser les dossiers patients, les demandes d’examens et les résultats, tout en conservant le fonctionnement papier actuellement utilisé par le laborantin.

L’application permettra également de générer les comptes rendus, de suivre les remises physiques et de proposer un portail sécurisé pour les patients qui souhaitent recevoir leurs résultats par voie numérique.

La réussite du projet reposera sur la fiabilité de l’association entre les patients et leurs examens, le respect des procédures de validation, la confidentialité des données médicales et la traçabilité des remises.

> **Points à confirmer avant la validation définitive du CDC**
>
> - Qui valide définitivement les résultats avant leur transmission ?
> - Le choix du mode de réception est-il enregistré à chaque demande ?
> - Quels champs d’identité seront utilisés pour vérifier le patient sur le portail ?
> - Quel prestataire sera utilisé pour l’envoi des SMS et des e-mails ?
> - Quelles sont les règles de conservation et de sauvegarde des données de la clinique ?
