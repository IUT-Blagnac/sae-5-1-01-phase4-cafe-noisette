# sae-back

## Table des matières
- [Introduction](#introduction)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement de l'application en mode dev](#lancement-de-lapplication-en-mode-dev)
- [Build de l'application](#build-de-lapplication)
- [Déploiement de l'application](#déploiement-de-lapplication)
  - [Paramétrage](#paramétrage)
- [Documentation technique](#documentation-technique)

## Introduction

Ce backend est une API REST qui permet de gérer les données de l'application.
Elle utilise le framework Quarkus en Java 17 et utilise maven pour la gestion des dépendances.

## Prérequis

- Java 17
- Maven
- Docker

## Installation

```bash
./mvnw clean install
```

## Lancement de l'application en mode dev

```bash
./mvnw quarkus:dev
```

## Build de l'application

### Génération des clés de chiffrement

Pour assurer la sécurité des données, il faut remplacer les clés de chiffrement par défaut par des clés générées aléatoirement.

Pour cela, il faut exécuter la commande suivante :

```bash
cd src/main/resources
openssl req -newkey rsa:2048 -new -nodes -keyout privatekey.pem -out csr.pem
openssl rsa -in privatekey.pem -pubout > publickey.pem
```

### Sécurité supplémentaire

Pour améliorer la sécurité de l'application, il est possible de modifier le `SECRET` utilisé pour générer les tokens JWT.

Pour le moment, cela se fait dans le fichier [AuthConstants.java](src/main/java/fr/cafenoisette/saes5management/constants/AuthConstants.java). (TODO : mettre dans le fichier .env)

### Build l'image docker

Première étape : build le backend en mode classique jvm (.jar)

```bash
./mvnw clean package
```

Deuxième étape : build l'image docker

```bash
docker build -f src/main/docker/Dockerfile.jvm -t quarkus/sae-back-jvm .
```

## Déploiement de l'application

Le déploiement peut se faire très simplement via docker-compose.

```bash
cd src/main/docker-compose
docker compose up
```

Le fichier [docker-compose.yml](src/main/docker-compose) contient les informations nécessaires pour lancer le backend et la base de données postgresql.

Vous pouvez paramétrer les variables d'environnement dans le fichier [.env](src/main/docker-compose/.env-exemple). Voir la section [Paramétrage](#paramétrage).

<b>⚠️ Attention, le premier lancement prendra un peu de temps car la base de données doit être initialisée. En attendant, il se peut que le backend se redémarre quelques fois après des erreurs de connexion à la base de données.</b>

### Paramétrage

Avant de démarrer l'application, il faut configurer un fichier `.env` dans le dossier `src/main/docker-compose`.
Le fichier .env contient les variables d'environnement suivantes :

- `DB_NAME` : nom de la base de données
- `DB_USER` : nom de l'utilisateur de la base de données
- `DB_PASSWORD` : mot de passe de l'utilisateur de la base de données
- `DB_PORT` : port de la base de données
- `ADMIN_USERNAME` : nom d'utilisateur de l'administrateur principal
- `ADMIN_PASSWORD` : mot de passe de l'administrateur principal
- `DOCKER_DB_VOLUME_PATH` : chemin du volume docker pour la base de données
- `QUARKUS_PORT` : port du backend
- `QUARKUS_HIBERNATE_ORM_DATABASE_GENERATION` : stratégie de génération de la base de données (none, drop-and-create, create, drop, update).
<b>⚠️ Lors du premier lancement, il faut mettre cette variable à `drop-and-create` pour initialiser la base de données. Ensuite, il faut la mettre à `update` pour éviter de perdre les données à chaque redémarrage.</b>

[.env-example](src/main/docker-compose/.env-exemple) est un exemple de fichier .env.

## Documentation technique

La documentation technique du backend est disponible [ici](../docs/technical-docs/homeTechnicalDoc.md)