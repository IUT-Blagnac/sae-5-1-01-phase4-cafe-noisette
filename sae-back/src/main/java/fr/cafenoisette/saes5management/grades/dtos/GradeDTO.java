package fr.cafenoisette.saes5management.grades.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.cafenoisette.saes5management.grades.enums.GradeType;
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
public class GradeDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("grade")
    private Long grade;

    @JsonProperty("coefficient")
    private Long coefficient;

    @JsonProperty("type")
    private GradeType type;

    @JsonProperty("studentId")
    private Long studentId;
}
