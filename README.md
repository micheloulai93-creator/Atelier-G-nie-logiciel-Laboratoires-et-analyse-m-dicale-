# Application de gestion des examens biologiques — Centre Médical Anne-Mathias

## 1. Présentation de la société

**Nom de la société :** Centre Médical Anne-Mathias  
**Secteur d'activité :** Santé — analyses biologiques et gestion des examens médicaux  
**Localisation :** Côte d'Ivoire  
**Site web :** .

### Description

Le Centre Médical Anne-Mathias est la structure de santé concernée par ce projet de gestion des examens biologiques. Le projet vise à accompagner ses activités de suivi des patients, de gestion des demandes d'examens, de traitement des résultats et de production des comptes rendus.

La solution envisagée doit faciliter le travail du personnel autorisé, améliorer le suivi des examens et permettre aux patients d'accéder de manière sécurisée à leurs résultats validés.

## 2. Présentation du projet

**Nom du projet :** Application de gestion des examens biologiques du Centre Médical Anne-Mathias  
**Domaine :** Santé numérique — développement logiciel et gestion des examens biologiques  
**Responsable du projet :** OULAI Michel  
**Date de début :**  
**Cadre de réalisation :** Module Atelier Génie Logiciel — Institut Ivoirien de Technologie (IIT)

### Contexte et problématique

La gestion des examens biologiques nécessite de suivre plusieurs étapes : l'enregistrement du patient, la création d'une demande d'examens, la saisie des résultats, leur validation et la remise du compte rendu.

Lorsque ces étapes sont gérées à travers des outils dispersés ou des procédures manuelles, le suivi des demandes et des documents peut devenir difficile. Il est donc nécessaire de disposer d'une solution centralisée qui facilite la gestion des informations, améliore la traçabilité des opérations et protège la confidentialité des données médicales.

Le projet s'inscrit dans cette démarche de numérisation du processus de gestion des examens biologiques.

### Objectifs

L'objectif principal est de concevoir et développer une application permettant de gérer le cycle de vie des examens biologiques, de l'enregistrement du patient à la mise à disposition du compte rendu.

Les objectifs spécifiques sont :

- Centraliser les informations des patients et leurs demandes d'examens.
- Faciliter la création, la consultation et le suivi des demandes d'examens biologiques.
- Permettre la saisie, l'enregistrement et la validation des résultats par les personnes habilitées.
- Générer des comptes rendus consultables et téléchargeables au format PDF.
- Assurer le suivi de la remise des comptes rendus au format numérique ou physique.
- Mettre en place une gestion des utilisateurs et des autorisations d'accès.
- Proposer un portail patient distinct permettant de consulter uniquement les résultats validés et autorisés.
- Renforcer la confidentialité et la traçabilité des opérations sensibles.

### Solution proposée

La solution proposée est une application web composée de deux espaces complémentaires :

**1. Espace du personnel médical et administratif**

Cet espace permet aux utilisateurs autorisés de gérer les patients, de créer et suivre les demandes d'examens, de saisir les résultats, de valider les comptes rendus et de suivre leur remise. Il comprend également des fonctionnalités d'administration, de gestion des utilisateurs, de notifications et de paramétrage.

**2. Portail patient**

Cet espace distinct permet au patient de vérifier son identité, de confirmer son accès au moyen d'un code de vérification, de consulter les comptes rendus qui lui sont destinés et de télécharger les documents disponibles au format PDF.

L'accès aux résultats est conditionné par leur validation et leur publication autorisée. Les droits d'accès et les actions sensibles doivent être contrôlés afin de protéger les informations médicales.

### Fonctionnalités principales

- **Authentification et gestion des accès :** connexion du personnel, déconnexion, récupération du mot de passe et gestion des rôles.
- **Tableau de bord :** visualisation des indicateurs et des tâches à traiter.
- **Gestion des patients :** création, recherche, consultation et modification des dossiers selon les autorisations.
- **Demandes d'examens :** création des demandes, sélection des examens, suivi des statuts et consultation de l'historique.
- **Saisie des résultats :** enregistrement provisoire, contrôle des champs et validation par une personne habilitée.
- **Gestion des comptes rendus :** génération, prévisualisation, export PDF et suivi de la remise.
- **Remise des résultats :** suivi de la remise numérique ou physique des comptes rendus.
- **Portail patient sécurisé :** vérification d'identité, vérification par code, consultation des résultats publiés et téléchargement des PDF.
- **Notifications :** consultation des événements et notifications utiles au personnel.
- **Utilisateurs et sécurité :** gestion des comptes, attribution des rôles, activation ou désactivation des accès et traçabilité des actions sensibles.
- **Paramètres :** gestion des informations de l'établissement et des paramètres du compte rendu.
- **Gestion des états système :** messages de succès et d'erreur, confirmations des actions sensibles et états de chargement.

### Périmètre fonctionnel

Le parcours principal de l'application est organisé comme suit :

1. Le personnel autorisé se connecte à l'application.
2. Il recherche un patient existant ou crée un nouveau dossier.
3. Il crée une demande et sélectionne les examens nécessaires.
4. Le personnel de laboratoire saisit les résultats.
5. Une personne habilitée vérifie et valide les résultats.
6. L'application permet de générer et de prévisualiser le compte rendu.
7. Le compte rendu est mis à disposition numériquement ou remis physiquement.
8. Le patient vérifie son identité et son code d'accès.
9. Le patient consulte et télécharge uniquement les documents qui lui sont destinés.

### Technologies utilisées

Les technologies définitives seront précisées au fur et à mesure de l'implémentation du projet.

- **Conception des interfaces :** Figma.
- **Langages, framework frontend et backend :** .
- **Base de données :** .
- **Gestion de versions :** Git et GitHub.


### Sécurité et confidentialité

L'application manipule des informations médicales qui nécessitent une protection particulière. Les principes suivants devront être pris en compte pendant le développement :

- Contrôle des accès selon les rôles et les responsabilités.
- Vérification des autorisations côté serveur.
- Protection des comptes rendus et des fichiers PDF.
- Accès patient limité aux documents qui lui sont destinés.
- Interdiction d'afficher au patient des résultats non validés ou non publiés.
- Traçabilité des opérations sensibles.
- Gestion des sessions, des codes de vérification et des erreurs d'accès.
- Validation des règles de conservation et de traitement des données avant la mise en production.

## 3. Liens utiles

### Conception et maquettage

- **Figma :** [https://www.figma.com/design/mtrKywPhzgxOUPFo03jpUW/Untitled?node-id=0-1&t=efUNKzzhWBWKe7Lk-1](#).

### Organisation et suivi du projet

- **Backlog produit :** consulter le fichier `cadrage/backlog.md` dans le dépôt du projet.

### Dépôt du code source

- **GitHub :** [Ajouter le lien vers le dépôt GitHub du projet](#).

### Documentation

- **README :** présentation du projet, de son périmètre et de ses ressources.
- **Backlog produit :** liste des fonctionnalités, user stories, priorités et critères d'acceptation.
- **Documentation technique :** à compléter avec l'architecture, l'installation, la configuration et les choix techniques.
- **Documentation utilisateur :** à compléter avec les procédures d'utilisation de l'application.

### Autres ressources



## 4. Installation et lancement

Les instructions d'installation seront ajoutées après la validation de la stack technique et la mise en place du dépôt de code.

À terme, cette section devra préciser :

1. Les prérequis logiciels.
2. La procédure de clonage du dépôt.
3. L'installation des dépendances.
4. La configuration des variables d'environnement.
5. La création et la configuration de la base de données.
6. Les commandes de lancement en développement.
7. La procédure d'exécution des tests.



*Projet réalisé dans le cadre du module Atelier Génie Logiciel à l'Institut Ivoirien de Technologie (IIT).*  
*Document évolutif : les technologies, les liens et les règles métier seront complétés à mesure que le projet avance.*
