package fr.iut.blagnac.users.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String username;

    private String firstname;

    private String lastname;

    private String email;

    @OneToOne
    @JoinColumn(name = "playerInfo_id")
    private PlayerInfoEntity playerInfo;

    private String password;
   

}
