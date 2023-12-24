# sae-front

## Table des matières

- [Introduction](#introduction)
- [Installation](#installation)
- [Lancement de l'application en mode dev](#lancement-de-lapplication-en-mode-dev)
- [Build de l'application](#build-de-lapplication)
  - [Paramétrage](#paramétrage)
- [Déploiement de l'application](#déploiement-de-lapplication)
  - [Installation de l'outil de déploiement](#installation-de-loutil-de-déploiement)
  - [Lancement de l'application](#lancement-de-lapplication)
- [Documentation utilisateur](#documentation-utilisateur)

## Introduction

Ce frontend est une application web qui permet de gérer les données de l'application.
Elle utilise le framework React en Typescript et utilise npm pour la gestion des dépendances.

## Installation

```bash
npm install
```

## Lancement de l'application en mode dev

```bash
npm start
```

## Build de l'application

### Paramétrage

Avant de build l'application, il faut paramétrer l'URL de l'API REST (backend), selon l'environnement de déploiement.

Le fichier [.env](.env) contient les informations nécessaires pour paramétrer l'application.

- `REACT_APP_API_URL` : URL de l'API REST (backend)

```bash
npm run build
```

## Déploiement de l'application

### Installation de l'outil de déploiement

```bash
npm install -g serve
```

### Lancement de l'application

```bash
serve -s build
```

Cette commande va lancer un serveur web sur le port 3000.

## Documentation utilisateur

La documentation technique du frontend est disponible [ici](../docs/user-docs/homeUserDoc.md)