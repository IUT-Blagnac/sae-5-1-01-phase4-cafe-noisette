package fr.iut.blagnac.users.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import fr.iut.blagnac.users.enums.UserRole;
import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RegisterForReflection
public class UserDTO {

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

    @JsonProperty("password")
    private String password;

    @JsonProperty("roles")
    private Set<UserRole> roles;



}
