package fr.iut.blagnac.users.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @JsonProperty("Firstname")
    private String Firstname;

    @JsonProperty("Lastname")
    private String Lastname;

    @JsonProperty("email")
    private String email;

    @JsonProperty("playerInfo")
    private String playerInfo;

    @JsonProperty("password")
    private String password;



}
