# TEMPLATE

## Table des matières

- [Description](#description)
- [DTO](#dto)
- [Entités](#entités)
  - [Annotations utilisées](#annotations-utilisées)
  - [ProjectEntity](#projectentity)
- [Méthodes du controller](#méthodes-du-controller)

## Description

Ce document technique explique le fonctionnement du package "project".
Ce package permet de gérer les différents projets de la SAE. 

## DTO

Voici les attributs du DTO des projets :

- Long id : identifiant du projet
- String name : nom du projet
- String description : description du projet
- Set<Long> clientsId : les identifiants des clients

Voici un exemple de DTO sous format JSON utilisé lors de la création d'un projet :

```
{
  "name" : "projet",
  "description" : "Un projet pour la SAE",
  "clientsId" : [1, 2]
}
```
> L'identifiant n'est pas présent dans le JSON car il est ajouté et incrémenté automatiquement



## Entités

### Annotations utilisées

- @Id : identifiant de l'entité (donnée utilisée en base de données comme clé primaire)
- @GeneratedValue : valeur générée automatiquement pour l'identifiant
- @ManyToMany : permet de préciser que l'attribut est une relation n-n

### ProjectEntity

Entité représentant un projet.

- _@Id @GeneratedValue_ **Long id** : identifiant du projet
- **String name** : nom du projet
- **String description** : description du projet
- _@ManyToOne_ **Set<UserEntity> clients** : clients qui ont proposé le projet

## Méthodes du controller

Voici les différentes méthodes présentes dans le controller :

| Méthode | Path                 | Description                                | Rôle(s) requis         | Condition(s) d'accès             | Query params (* : obligatoire) | Body       | Retour           |
|---------|----------------------|--------------------------------------------|------------------------|----------------------------------|--------------------------------|------------|------------------|
| POST    | /projects            | Crée un projet                             | TEACHER, ADMIN         | Être connecté (token en entête)  | Aucun                          | ProjectDTO | ProjectDTO       |
| GET     | /projects/id         | Récupère le projet avec l'id correspondant | ** (ALL)               | Être connecté (token en entête)  | Long id                        | Aucun      | List<ProjectDTO> |
| GET     | /projects            | Récupère tous les projets                  | ** (ALL)               | Être connecté (token en entête)  | Aucun                          | Aucun      | List<ProjectDTO> |
| PUT     | /projects            | Mets à jour le projet                      | TEACHER, ADMIN, CLIENT | Être connecté (token en entête)  | Aucun                          | ProjectDTO | ProjectDTO       |
| DELETE  | /projects/projectId  | Supprime un projet                         | TEACHER, ADMIN, CLIENT | Être connecté (token en entête)  | Long projectId                 | Aucun      | Rien             |
