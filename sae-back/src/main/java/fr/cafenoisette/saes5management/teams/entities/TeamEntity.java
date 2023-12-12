package fr.cafenoisette.saes5management.teams.entities;

import fr.cafenoisette.saes5management.projects.entities.ProjectEntity;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TeamEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String github;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectEntity project;

    @OneToMany
    @JoinColumn(name = "members_id")
    private Set<UserEntity> members;

    @OneToOne
    @JoinColumn(name = "leader_id")
    private UserEntity leader;

    @OneToMany
    @JoinColumn(name = "project_preferences")
    private List<ProjectEntity> preferences;

}
