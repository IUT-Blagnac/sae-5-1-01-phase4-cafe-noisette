package fr.iut.blagnac.invites.entities;

import fr.iut.blagnac.teams.entities.TeamEntity;
import fr.iut.blagnac.users.entities.PlayerInfoEntity;
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
public class InviteEntity {

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
    private Set<UserRole> roles;

    @ManyToOne
    @JoinColumn(name = "team_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private TeamEntity team;

}
