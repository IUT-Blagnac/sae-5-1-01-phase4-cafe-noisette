package fr.iut.blagnac.users.enums;

import lombok.Getter;

@Getter
public enum UserRole {

    ADMIN("admin"),
    TEACHER("teacher"),
    STUDENT_INIT("student_init"),
    STUDENT_ALT("student_alt"),
    CONTACT("contact");

    private String role;

    private UserRole(String role) {
        this.role = role;
    }

}
