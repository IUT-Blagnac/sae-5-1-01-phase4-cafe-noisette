package fr.iut.blagnac.teams.entities;

import fr.iut.blagnac.project.dtos.ProjectDTO;
import fr.iut.blagnac.project.entities.ProjectEntity;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.enums.UserRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProjectEntity project;

    private ArrayList<UserDTO> members;

    private UserEntity leader;


}
