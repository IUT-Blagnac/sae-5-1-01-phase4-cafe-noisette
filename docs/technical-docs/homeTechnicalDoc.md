# Documentation technique

## Diagramme de classe

### Diagramme de classe définitif
Voici le diagramme de classe définitif de l'application :

<img src="diagrams/sae-s5-final-diagram.drawio.png" width="60%" alt="Diagramme de classe définitif">

- Version définitive grand format (PNG) : [sae-s5-final-diagram.drawio.png](diagrams/sae-s5-final-diagram.drawio.png)
- Version définitive éditable (JGraph / draw.io) : [sae-s5-final-diagram.drawio](diagrams/sae-s5-final-diagram.drawio)

### Diagramme de classe initial (= incomplet)

- Version initiale grand format (PNG) : [sae-s5-initial-diagram.drawio.png](diagrams/sae-s5-initial-diagram.drawio.png)
- Version initiale éditable (JGraph / draw.io) : [sae-s5-initial-diagram.drawio](diagrams/sae-s5-initial-diagram.drawio)

## Documentation technique Backend

### Installation

La documentation technique d'installation du backend est disponible [ici](../../sae-back/README.md).


### Documentation par "backends"

Quarkus est un framework qui permet de créer des backends en Java. Sa force est notamment l'utilisation de backends microservices. Cependant, dans le cadre de ce projet et étant donné le peu de charge attendue, le principe de microservices ne serait pas adapté. Pour autant, nous avons tout de même découpé le backend en plusieurs "backends" (modules) afin de faciliter la maintenance et la compréhension du code.

#### Module "Users"

##### Description

Ce module permet de gérer les utilisateurs de l'application. La documentation technique dédiée est disponible [ici](docBackendUsers.md).

#### Module "Projects"

##### Description

Ce module permet de gérer les projets de l'application. La documentation technique dédiée est disponible [ici](docBackendProjects.md).

#### Module "Teams"

##### Description

Ce module permet de gérer les équipes de l'application. La documentation technique dédiée est disponible [ici](docBackendTeams.md).

#### Module "Authentication"

##### Description

Ce module permet de gérer l'authentification des utilisateurs de l'application. La documentation technique dédiée est disponible [ici](docBackendAuthentication.md).

## Documentation technique Frontend

### Installation

La documentation technique d'installation du frontend est disponible [ici](../../sae-front/README.md).
