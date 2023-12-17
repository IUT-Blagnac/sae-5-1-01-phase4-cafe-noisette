# TEMPLATE

## Table des matières

- [Description](#description)
- [DTOs](#dtos)
  - [TeamDTO](#teamdto)
- [Entités](#entités)
  - [TeamEntity](#teamentity)
- [Méthodes du controller](#méthodes-du-controller)

## Description

Ce module permet de gérer les teams/groupes de l'application.

## DTOs

### TeamDTO

DTO représentant une team :

- Long id : identifiant du team
- String name : nom de la team
- String github : lien git hub de la team
- Long projectId : identifiant du project choisi par la team
- Set<Long> membersId : liste des identifiants des membres de la team
- Long leaderId : id de l'utilisateur étant le leader
- preferenceId : liste ordonnée par préférence des id de projects

## Entités

### Annotations utilisées

- @Id : identifiant de l'entité (donnée utilisée en base de données comme clé primaire)
- @GeneratedValue : valeur générée automatiquement pour l'identifiant
- @OneToOne : permet de préciser que l'attribut est une relation 1-1
- @ManyToOne : permet de préciser que l'attribut est une relation n-1
- @ManyToMany : permet de préciser que l'attribut est une relation n-n

### TeamEntity

Entité représentant une team

- _@Id @GeneratedValue_ **Long id** : identifiant de la team
- **String name** : nom de la team
- **String github** : nom du lien github du project
- _@ManyToOne_ **projectEntity project** : informations sur le project sélectionné par l'équipe
- _@OneToMany_ **Set<UserEntity> members** : liste des informations sur les membres de l'équipe
- _@OneToOne_ **UserEntity leader** : informations sur l'utilisateur désigné comme leader de la team
- -@ManyToOne_ **List<ProjectEntity> preferences** : liste ordonnée par préférence des informations sur les différents projets


## Méthodes du controller

Exemple de tableau :

| Méthode   | Path                   | Description                                               | Rôle(s) requis       | Condition(s) d'accès            | Query params (* : obligatoire)                                           | Body          | Retour               |
|-----------|------------------------|-----------------------------------------------------------|--------------------- |---------------------------------|--------------------------------------------------------------------------|---------------|----------------------|
| GET       | /{id}                  | Récupérer une team via l'id                               | ** (ALL)             | Être connecté (token en entête) | Aucun                                                                    | Aucun         | TeamDTO              |
| POST      | /                      | Créer une team                                            | STUDENT_INIT, ADMIN  | Aucune                          | Aucun                                                                    | TeamDTO       | TeamDTO              |
| GET       | /filter                | Récupère tous les étudiants filtrés selon des QueryParam  | ** (ALL)             | Être connecté (token en entête) | Long id, String name, Long projectId, Long leaderId                      | Aucun         | TeamDTO              |
| GET       | /{teamId/addMember     | Ajouter un membre à une team                              | STUDENT_INIT, ADMIN  | Être connecté (token en entête) | Aucun                                                                    | UserDTO       | TeamDTO              |
| GET       | /{teamId/addPreferences| Ajouter des préférences à la team                         | STUDENT_INIT, ADMIN  | Être connecté (token en entête) | Aucun                                                                    | TeamDTO       | TeamDTO              |
| GET       | /{teamId/addProject    | Ajouter un project à la team                              | TEACHER, ADMIN       | Être connecté (token en entête) | Aucun                                                                    | TeamDTO       | TeamDTO              |
| GET       | /{teamId/removeProject | Supprimer le project de la team                           | TEACHER, ADMIN       | Être connecté (token en entête) | Aucun                                                                    | Long          | TeamDTO              |
