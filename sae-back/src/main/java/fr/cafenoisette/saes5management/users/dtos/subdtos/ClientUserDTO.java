package fr.cafenoisette.saes5management.users.dtos.subdtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.cafenoisette.saes5management.users.dtos.PlayerInfoDTO;
import fr.cafenoisette.saes5management.users.enums.UserRole;
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

    @JsonProperty("roles")
    private Set<UserRole> roles;
    
}
