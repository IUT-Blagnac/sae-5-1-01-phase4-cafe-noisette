package fr.iut.blagnac.projects.entities;

import fr.iut.blagnac.users.entities.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProjectEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String description;

    @OneToMany
    @JoinColumn(name = "contact_ids")
    private Set<UserEntity> contacts;

}
