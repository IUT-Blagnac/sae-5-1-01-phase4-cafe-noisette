package fr.iut.blagnac.project.entities;

import fr.iut.blagnac.users.entities.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProjectEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String nom;

    private String desc;

    @OneToOne
    @JoinColumn(name = "contact_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity contact;

}
