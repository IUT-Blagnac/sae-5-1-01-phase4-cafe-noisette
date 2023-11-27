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

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("contactId")
    private Long contactId;
}
