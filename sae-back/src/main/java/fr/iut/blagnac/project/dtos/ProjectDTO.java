package fr.iut.blagnac.project.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import fr.iut.blagnac.users.dtos.UserDTO;
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
public class ProjectDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("nom")
    private String nom;

    @JsonProperty("desc")
    private String desc;

    @JsonProperty("contact")
    private UserDTO contact;
}
