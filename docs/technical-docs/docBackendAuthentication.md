# TEMPLATE

## Table des matières

- [Description](#description)
- [DTOs](#dtos)
  - [AuthRequest](#authrequest)
  - [AuthResponse](#authresponse)
- [Méthodes du controller](#méthodes-du-controller)

## Description

Ce module permet de gérer l'authentification des utilisateurs de l'application. Il s'agit principalement de d'un module proposant des méthodes utilitaires.

## DTOs

### AuthRequest

DTO représentant une requête d'authentification.

- String username : nom d'utilisateur
- String password : mot de passe

### AuthResponse

DTO représentant une réponse d'authentification.

- String token : token d'authentification

## Méthodes du controller

| Méthode | Path        | Description      | Rôle(s) requis | Condition(s) d'accès | Query params (* : obligatoire) | Body        | Retour       |
|---------|-------------|------------------|----------------|----------------------|--------------------------------|-------------|--------------|
| POST    | /auth/login | Authentification | ** (ALL)       | Aucune               | Aucun                          | AuthRequest | AuthResponse | 