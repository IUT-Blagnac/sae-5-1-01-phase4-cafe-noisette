package fr.cafenoisette.saes5management.grades.entities;

import fr.cafenoisette.saes5management.grades.enums.GradeType;
import fr.cafenoisette.saes5management.teams.entities.TeamEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class GradeEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String description;

    private Long grade;

    private Long coefficient;

    @Enumerated(EnumType.STRING)
    private GradeType type;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private TeamEntity team;
}
