package fr.iut.blagnac.invites.enums;

import lombok.Getter;

@Getter
public enum InviteState {

    ACCEPTED("accepted"),
    REFUSED("refused"),
    CANCELED("canceled"),
    PENDING("pending"),
    CONTACT("contact");

    private String role;

    private InviteState(String role) {
        this.role = role;
    }

}
