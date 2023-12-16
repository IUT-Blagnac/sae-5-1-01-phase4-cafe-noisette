package fr.cafenoisette.saes5management.users.entities;

import fr.cafenoisette.saes5management.teams.entities.TeamEntity;
import fr.cafenoisette.saes5management.users.enums.UserRole;
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

    @Column(unique = true)
    private String username;

    private String firstname;

    private String lastname;

    @Column(unique = true)
    private String email;

    @OneToOne
    @JoinColumn(name = "playerInfo_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PlayerInfoEntity playerInfo;

    private String password;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<UserRole> roles;

    @ManyToOne
    @JoinColumn(name = "team_id",nullable=true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private TeamEntity team;

}
