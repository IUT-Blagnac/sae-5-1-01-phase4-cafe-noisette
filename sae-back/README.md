# sae-back

## Table des matières
- [Introduction](#introduction)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement de l'application en mode dev](#lancement-de-lapplication-en-mode-dev)
- [Build de l'application](#build-de-lapplication)
- [Déploiement de l'application](#déploiement-de-lapplication)
  - [Paramétrage](#paramétrage)

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

Vous pouvez paramétrer les variables d'environnement dans le fichier [.env](src/main/docker-compose/.env). Voir la section [Paramétrage](#paramétrage).

<b>⚠️ Attention, le premier lancement prendra un peu de temps car la base de données doit être initialisée. En attendant, il se peut que le backend se redémarre quelques fois après des erreurs de connexion à la base de données.</b>

### Paramétrage

Le fichier [.env](src/main/docker-compose/.env) contient les variables d'environnement suivantes :

- `DB_NAME` : nom de la base de données
- `DB_USER` : nom de l'utilisateur de la base de données
- `DB_PASSWORD` : mot de passe de l'utilisateur de la base de données
- `DB_PORT` : port de la base de données
- `DOCKER_DB_VOLUME_PATH` : chemin du volume docker pour la base de données
- `QUARKUS_PORT` : port du backend
- `QUARKUS_HIBERNATE_ORM_DATABASE_GENERATION` : stratégie de génération de la base de données (none, drop-and-create, create, drop, update).
<b>⚠️ Lors du premier lancement, il faut mettre cette variable à `drop-and-create` pour initialiser la base de données. Ensuite, il faut la mettre à `update` pour éviter de perdre les données à chaque redémarrage.</b>