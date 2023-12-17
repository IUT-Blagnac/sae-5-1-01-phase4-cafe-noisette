package fr.cafenoisette.saes5management.projects.entities;

import fr.cafenoisette.saes5management.teams.entities.TeamEntity;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @Column(length = 1024, columnDefinition = "TEXT")
    private String description;

    @ManyToMany
    @JoinTable(
            name = "project_contacts",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<UserEntity> clients;

    @ManyToMany
    @JoinTable(
            name = "preference_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<TeamEntity> teamEntitiesUsingAsPreference;



}
