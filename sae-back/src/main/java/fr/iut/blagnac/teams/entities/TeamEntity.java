package fr.iut.blagnac.teams.entities;

import fr.iut.blagnac.project.entities.ProjectEntity;
import fr.iut.blagnac.users.entities.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

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
    private ArrayList<UserEntity> members;

    @OneToOne
    @JoinColumn(name = "leader_id")
    private UserEntity leader;


}
