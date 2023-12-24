# TEMPLATE

## Table des matières

- [Description](#description)
- [DTOs](#dtos)
  - [DTO 1](#dto-1)
  - [DTO 2](#dto-2)
- [Entités](#entités)
  - [Entité 1](#entité-1)
  - [Entité 2](#entité-2)
- [Méthodes du controller](#méthodes-du-controller)

## Description

Description du répertoire.

## DTOs

### DTO 1

Description du DTO 1. (format json par exemple)

### DTO 2

Description du DTO 2. (format json par exemple)

...

## Entités

### Entité 1

Description de l'entité 1. (reprendre @annotation - type - attribut)

### Entité 2

Description de l'entité 2. (reprendre @annotation - type - attribut)

## Méthodes du controller

Exemple de tableau :

| Méthode   | Path                   | Description                 | Rôle(s) requis | Condition(s) d'accès            | Query params (* : obligatoire)                                           | Body    | Retour               |
|-----------|------------------------|-----------------------------|----------------|---------------------------------|--------------------------------------------------------------------------|---------|----------------------|
| POST      | /users                 | Créer un compte             | ** (ALL)       | Aucune                          | Aucun                                                                    | UserDTO | UserDTO              |
| GET       | /users/students/filter | Récupère tous les étudiants | ** (ALL)       | Être connecté (token en entête) | Long id, String username, String firstname, String lastname, Long teamId | Aucun   | List<StudentUserDTO> |