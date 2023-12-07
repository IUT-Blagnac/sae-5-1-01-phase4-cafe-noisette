package fr.cafenoisette.saes5management.projects.entities;

import fr.cafenoisette.saes5management.users.entities.UserEntity;
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
    @JoinColumn(name = "client_ids")
    private Set<UserEntity> clients;

}
