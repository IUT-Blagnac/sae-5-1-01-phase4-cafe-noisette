package fr.cafenoisette.saes5management.teams.entities;

import fr.cafenoisette.saes5management.projects.entities.ProjectEntity;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private ProjectEntity project;

    @OneToMany
    @JoinColumn(name = "members_id")
    private Set<UserEntity> members;

    @OneToOne
    @JoinColumn(name = "leader_id")
    private UserEntity leader;

    @ManyToMany
    @JoinTable(
            name = "preference_project",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private List<ProjectEntity> preferences;

}
