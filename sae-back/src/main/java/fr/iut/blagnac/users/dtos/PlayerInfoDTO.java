package fr.iut.blagnac.users.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Size;
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
public class PlayerInfoDTO {

    @JsonProperty("id")
    private Long id;
    
    @JsonProperty("nickname")
    private String nickname;

    @JsonProperty("globalLevel")
    @Size(max= 5) 
    private int globalLevel;

    @JsonProperty("chiefLevel")
    @Size(max= 5) 
    private int chiefLevel;

    @JsonProperty("frontLevel")
    @Size(max= 5)
    private int frontLevel;

    @JsonProperty("backLevel")
    @Size(max= 5)
    private int backLevel;

    @JsonProperty("testLevel")
    @Size(max= 5)
    private int testLevel;

    @JsonProperty("docLevel")
    @Size(max= 5)
    private int docLevel;

    @JsonProperty("gitLevel")
    @Size(max= 5)
    private int gitLevel;

    @JsonProperty("designLevel")
    @Size(max= 5)
    private int designLevel;

    @JsonProperty("otherDesc")
    private String otherDesc;

    @JsonProperty("otherLevel")
    @Size(max= 5)
    private int otherLevel;
    
    
    
}
