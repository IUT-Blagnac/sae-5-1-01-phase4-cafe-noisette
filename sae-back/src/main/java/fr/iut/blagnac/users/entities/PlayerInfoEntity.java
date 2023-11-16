package fr.iut.blagnac.users.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class PlayerInfoEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String nickname;

    private int globalLevel;

    private int chiefLevel;

    private int backLevel;

    private int frontVevel;

    private int testLevel;

    private int docLevel;

    private int gitLevel;

    private int designLevel;

    private String otherDesc;

    private int otherLevel;

 
}
