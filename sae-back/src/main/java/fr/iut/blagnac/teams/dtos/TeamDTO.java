package fr.iut.blagnac.teams.dtos;

import java.util.ArrayList;
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
public class TeamDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("github")
    private String github;

    @JsonProperty("projectId")
    private Long projectId;

    @JsonProperty("membersId")
    private  ArrayList<Long> membersId;

    @JsonProperty("leaderId")
    private Long leaderId;


}
