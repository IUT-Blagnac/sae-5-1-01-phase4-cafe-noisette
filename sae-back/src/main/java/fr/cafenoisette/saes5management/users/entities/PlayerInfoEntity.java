package fr.cafenoisette.saes5management.users.entities;

import fr.cafenoisette.saes5management.projects.entities.ProjectEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PlayerInfoEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String nickname;

    private int globalLevel;

    private int chiefLevel;

    private int backLevel;

    private int frontLevel;

    private int testLevel;

    private int docLevel;

    private int gitLevel;

    private int designLevel;

    private String otherDesc;

    private int otherLevel;

    @ManyToMany
    @JoinTable(
            name = "preference_project",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    private List<ProjectEntity> preferences;
}
