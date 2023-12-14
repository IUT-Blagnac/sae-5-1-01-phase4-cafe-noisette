package fr.cafenoisette.saes5management.grades.enums;

import lombok.Getter;

@Getter
public enum GradeType {

    TEACHER("teacher"),
    CLIENT("client");

    private final String type;

    GradeType(String type) {
        this.type = type;
    }

}
