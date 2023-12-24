# TEMPLATE

## Table des matières

- [Description](#description)
- [DTO](#dto)
- [Entités](#entités)
  - [Annotations utilisées](#annotations-utilisées)
  - [GradeEntity](#gradeentity)
- [Méthodes du controller](#méthodes-du-controller)

## Description

Ce document technique explique le fonctionnement du package "grade".
Ce package permet de gérer les différentes notes de la SAE. 

## DTO

Voici les attributs du DTO de notes :

- Long id : identifiant de la note
- String title : titre de la note
- String description : description de la note
- Long grade : note donnée
- Long coefficient : coefficient de la note
- GradeType type : qui a donné la note (professeur ou client)
- Long teamId : l'équipe notée

Voici un exemple de DTO sous format JSON utilisé lors de la création d'une note :

```
{
  "title" : "note",
  "description" : "Un note pour la SAE",
  "grade" : 15,
  "coefficient" : 10,
  "type" : "TEACHER",
  "teamId" : 1
}
```
> L'identifiant n'est pas présent dans le JSON car il est ajouté et incrémenté automatiquement



## Entités

### Annotations utilisées

- @Id : identifiant de l'entité (donnée utilisée en base de données comme clé primaire)
- @GeneratedValue : valeur générée automatiquement pour l'identifiant
- @Enumerated : permet de préciser que l'attribut est une énumération
- @ManyToMany : permet de préciser que l'attribut est une relation n-n


### GradeEntity

Entité représentant un note.

- _@Id @GeneratedValue_ **Long id** : identifiant de la note
- **String title** : titre de la note
- **String description** : description de la note
- **Long grade** : note donnée
- **Long coefficient** : coefficient de la note
- _@Enumerated_ **GradeType type** : qui a donné la note
- _@ManyToOne_ **Set<TeamEntity> team** : équipe notée 

## Méthodes du controller

Voici les différentes méthodes présentes dans le controller :

| Méthode | Path                   | Description                                         | Rôle(s) requis         | Condition(s) d'accès             | Query params (* : obligatoire)                                                                        | Body     | Retour          |
|---------|------------------------|-----------------------------------------------------|------------------------|----------------------------------|-------------------------------------------------------------------------------------------------------|----------|-----------------|
| POST    | /grades                | Crée une note                                       | TEACHER, ADMIN, CLIENT | Être connecté (token en entête)  | Aucun                                                                                                 | GradeDTO | GradeDTO        |
| GET     | /grades/id             | Récupère la note avec l'id correspondant            | ** (ALL)               | Être connecté (token en entête)  | Long id                                                                                               | Aucun    | List<GradeDTO>  |
| GET     | /grades/filter         | Récupère les notes triés selon certains paramètres  | ** (ALL)               | Être connecté (token en entête)  | Long id, String title, String description, Long grade, Long coefficient, GradeType type, Long teamId  | Aucun    | List<GradeDTO>  |
| PUT     | /grades/gradeId/update | Mets à jour une note                                | TEACHER, ADMIN, CLIENT | Être connecté (token en entête)  | Aucun                                                                                                 | GradeDTO | GradeDTO        |
| DELETE  | /grades/gradeId/delete | Supprime une note                                   | TEACHER, ADMIN, CLIENT | Être connecté (token en entête)  | Long gradeId                                                                                          | Aucun    | Rien            |
