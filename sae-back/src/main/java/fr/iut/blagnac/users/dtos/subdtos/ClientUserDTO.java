package fr.iut.blagnac.users.dtos.subdtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.iut.blagnac.users.dtos.PlayerInfoDTO;
import fr.iut.blagnac.users.enums.UserRole;
import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * This DTO is only used to return user, without private information, with the role CLIENT.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RegisterForReflection
public class ClientUserDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("username")
    private String username;

    @JsonProperty("firstname")
    private String firstname;

    @JsonProperty("lastname")
    private String lastname;

    @JsonProperty("email")
    private String email;

    @JsonProperty("playerInfo")
    private PlayerInfoDTO playerInfo;

    @JsonProperty("roles")
    private Set<UserRole> roles;
    
}
