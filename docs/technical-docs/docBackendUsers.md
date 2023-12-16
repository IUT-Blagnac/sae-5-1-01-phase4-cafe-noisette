# Documentation technique du backend "Users"

## Table des matières

- [Description](#description)
- [DTOs](#dtos)
  - [UserDTO](#userdto)
  - [PlayerInfoDTO](#playerinfodto)
  - [ClientUserDTO](#clientuserdto)
  - [StudentUserDTO](#studentuserdto)
- [Entités](#entités)
  - [UserEntity](#userentity)
  - [PlayerInfoEntity](#playerinfoentity)
- [Enumérations](#enumérations)
  - [UserRole](#userrole)
- [Méthodes du controller](#méthodes-du-controller)

## Description

Ce module permet de gérer les utilisateurs de l'application.

## DTOs

### UserDTO

DTO représentant un utilisateur.

- Long id : identifiant de l'utilisateur
- String username : nom d'utilisateur
- String firstname : prénom de l'utilisateur
- String lastname : nom de famille de l'utilisateur
- String email : adresse email de l'utilisateur
- PlayerInfoDTO playerInfo : informations sur le joueur (concerne uniquement les étudiants - voir [PlayerInfoDTO](#playerinfodto)
- String password : mot de passe de l'utilisateur (uniquement pour la création / connexion)
- Set<UserRole> roles : rôles de l'utilisateur (voir [UserRole](#userrole)
- Long teamId : identifiant de l'équipe de l'utilisateur (concerne uniquement les étudiants)

### PlayerInfoDTO

DTO représentant les informations sur le joueur. Seuls les utilisateurs ayant le rôle "STUDENT_INIT" ou "STUDENT_ALT" ont ces informations.

- Long id : identifiant de la fiche joueur
- String nickname : pseudo du joueur
- int globalLevel : niveau global du joueur
- int chiefLevel : niveau chef de projet du joueur
- int frontLevel : niveau frontend du joueur
- int backLevel : niveau backend du joueur
- int testLevel : niveau test du joueur
- int docLevel : niveau documentation du joueur
- int gitLevel : niveau git du joueur
- int designLevel : niveau design du joueur
- String otherDesc : description d'une autre compétence du joueur
- int otherLevel : niveau de cette autre compétence du joueur
- List<Long> preferencesId : liste des identifiants des préférences de "project" (parmi les projets proposés) du joueur

### ClientUserDTO

DTO représentant un utilisateur client. Ce DTO est utilisé uniquement en RETOUR, et ne contient que des informations utiles pour le client.

Reprendre les attributs de [UserDTO](#userdto) mais sans :
- password
- playerInfo
- teamId

### StudentUserDTO

DTO représentant un utilisateur étudiant. Ce DTO est utilisé uniquement en RETOUR, et ne contient que des informations utiles pour le client.

Reprendre les attributs de [UserDTO](#userdto) mais sans :
- password
- email

## Entités

### Annotations utilisées

- @Id : identifiant de l'entité (donnée utilisée en base de données comme clé primaire)
- @GeneratedValue : valeur générée automatiquement pour l'identifiant
- @Column : colonne de la table en base de données (permet de préciser des paramètres comme l'unicité)
- @Enumerated : permet de préciser que l'attribut est une énumération
- @ElementCollection : permet de préciser que l'attribut est une collection d'éléments
- @OneToOne : permet de préciser que l'attribut est une relation 1-1
- @ManyToOne : permet de préciser que l'attribut est une relation n-1
- @ManyToMany : permet de préciser que l'attribut est une relation n-n

### UserEntity

Entité représentant un utilisateur.

- _@Id @GeneratedValue_ **Long id** : identifiant de l'utilisateur
- _@Column(unique = true)_ **String username** : nom d'utilisateur
- **String firstname** : prénom de l'utilisateur
- **String lastname** : nom de famille de l'utilisateur
- _@Column(unique = true)_ **String email** : adresse email de l'utilisateur
- _@OneToOne_ **PlayerInfoEntity playerInfo** : informations sur le joueur (concerne uniquement les étudiants - voir [PlayerInfoEntity](#playerinfoentity)
- **String password** : mot de passe de l'utilisateur (haché)
- _@Enumerated(EnumType.STRING) @ElementCollection(fetch = FetchType.EAGER)_ **Set<UserRole> roles** : rôles de l'utilisateur - voir [UserRole](#userrole)
- _@ManyToOne_ **TeamEntity team** : équipe de l'utilisateur (concerne uniquement les étudiants)

### PlayerInfoEntity

Entité représentant les informations sur le joueur. Seuls les utilisateurs ayant le rôle "STUDENT_INIT" ou "STUDENT_ALT" ont ces informations.

- _@Id @GeneratedValue_ **Long id** : identifiant de la fiche joueur
- **String nickname** : pseudo du joueur
- **int globalLevel** : niveau global du joueur
- **int chiefLevel** : niveau chef de projet du joueur
- **int frontLevel** : niveau frontend du joueur
- **int backLevel** : niveau backend du joueur
- **int testLevel** : niveau test du joueur
- **int docLevel** : niveau documentation du joueur
- **int gitLevel** : niveau git du joueur
- **int designLevel** : niveau design du joueur
- **String otherDesc** : description d'une autre compétence du joueur
- **int otherLevel** : niveau de cette autre compétence du joueur
- _@ManyToMany_ **List<ProjectEntity> preferences** : liste des préférences de "project" (parmi les projets proposés) du joueur

## Enumérations

### UserRole

Enumération représentant les rôles d'un utilisateur.

- ADMIN : administrateur
- STUDENT_INIT : étudiant initial
- STUDENT_ALT : étudiant alternant
- TEACHER : enseignant
- CLIENT : client
- GUEST : invité

## Méthodes du controller

| Méthode | Path                           | Description                                                       | Rôle(s) requis                   | Condition(s) d'accès                                                                         | Query params (* : obligatoire)                                            | Body                                                     | Retour               |
|---------|--------------------------------|-------------------------------------------------------------------|----------------------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------|----------------------|
| POST    | /users                         | Créer un compte                                                   | ** (ALL)                         | Aucune                                                                                       | Aucun                                                                     | UserDTO                                                  | UserDTO              |
| GET     | /users/me                      | Récupère l'utilisateur connecté (à partir de son token)           | ** (ALL)                         | Être connecté (token en entête)                                                              | Aucun                                                                     | Aucun                                                    | UserDTO              |
| GET     | /users                         | Récupère tous les utilisateurs                                    | ADMIN                            | Être connecté (token en entête)                                                              | Long id, String username, UserRole role                                   | Aucun                                                    | List<UserDTO>        |
| GET     | /users/students/filter         | Récupère tous les étudiants filtrés selon des QueryParams         | ** (ALL)                         | Être connecté (token en entête)                                                              | Long id, String username, String firstname, String lastname, Long teamId  | Aucun                                                    | List<StudentUserDTO> |
| GET     | /users/clients/filter          | Récupère tous les clients filtrés selon des QueryParams           | ** (ALL)                         | Être connecté (token en entête)                                                              | Long id, String username, String firstname, String lastname, String email | Aucun                                                    | List<ClientUserDTO>  |
| PUT     | /users/admin/update            | Met à jour un utilisateur                                         | ADMIN                            | Être connecté (token en entête)                                                              | Aucun                                                                     | UserDTO                                                  | UserDTO              |
| PUT     | /users/{userId}/addPreferences | Ajoute des préférences de "project" à l'utilisateur d'id {userId} | ADMIN, STUDENT_INIT, STUDENT_ALT | Être connecté (token en entête) & être admin OU token correspondant à l'utilisateur {userId} | Aucun                                                                     | PlayerInfoDTO (seulement attribut "preferences" utilisé) | UserDTO              |
| DELETE  | /users/admin/delete/{userId}   | Supprime l'utilisateur d'id {userId}                              | ADMIN                            | Être connecté (token en entête)                                                              | Aucun                                                                     | Aucun                                                    | UserDTO              |