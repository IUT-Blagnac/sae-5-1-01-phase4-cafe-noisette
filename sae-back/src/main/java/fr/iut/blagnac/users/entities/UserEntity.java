package fr.iut.blagnac.users.entities;

import fr.iut.blagnac.users.enums.UserRole;
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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PlayerInfoEntity playerInfo;

    private String password;

    @Enumerated(EnumType.STRING)
    private Set<UserRole> roles;

}
