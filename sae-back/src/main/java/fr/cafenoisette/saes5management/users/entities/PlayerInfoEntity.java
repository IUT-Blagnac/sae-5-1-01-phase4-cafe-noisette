package fr.cafenoisette.saes5management.users.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

 
}
