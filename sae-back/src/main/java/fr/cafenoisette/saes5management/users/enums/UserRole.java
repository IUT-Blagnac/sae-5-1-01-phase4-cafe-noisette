package fr.cafenoisette.saes5management.users.enums;

import lombok.Getter;

@Getter
public enum UserRole {

    ADMIN("admin"),
    TEACHER("teacher"),
    STUDENT_INIT("student_init"),
    STUDENT_ALT("student_alt"),
    GUEST("guest"),
    CLIENT("client");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

}
