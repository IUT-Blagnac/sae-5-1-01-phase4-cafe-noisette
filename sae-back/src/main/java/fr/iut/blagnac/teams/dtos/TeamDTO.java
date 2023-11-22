package fr.iut.blagnac.teams.dtos;

import java.lang.reflect.Array;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonProperty;
import fr.iut.blagnac.users.enums.UserRole;
import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.project.dtos.ProjectDTO;
import fr.iut.blagnac.users.dtos.PlayerInfoDTO;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RegisterForReflection
public class TeamDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("github")
    private String github;

    @JsonProperty("projectId")
    private Long ProjectId;

    @JsonProperty("membersId")
    private  ArrayList<Long> membersId;

    @JsonProperty("leaderId")
    private Long leaderId;


}
