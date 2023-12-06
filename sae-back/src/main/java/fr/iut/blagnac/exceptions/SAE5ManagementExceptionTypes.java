package fr.iut.blagnac.exceptions;

import lombok.Getter;

@Getter
public enum SAE5ManagementExceptionTypes {

    BAD_REQUEST("Bad request", 400),
    USER_NOT_FOUND("User not found", 404),
    USER_NOT_AUTHENTICATED("User not authenticated", 401),
    USER_NOT_AUTHORIZED("User not authorized", 403),
    WRONG_PASSWORD("Wrong password", 401),
    PERSISTENCE_ERROR("Persistence error", 500),
    USER_ALREADY_EXISTS("User already exists", 409),
    USER_DOES_NOT_EXIST("User does not exist", 404),
    ALREADY_IN_TEAM("User is already in a team",409),
    USER_NOT_IN_TEAM("User is not in this team", 403),
    PROJECT_NOT_FOUND("Project not found", 404),
    TEAM_NOT_FOUND("Team not found", 404),
    USER_CANNOT_JOIN_THIS_TEAM("User can not join this team", 403);


    private final String message;
    private final int status;

    SAE5ManagementExceptionTypes(String message, int status) {
        this.message = message;
        this.status = status;
    }

}
