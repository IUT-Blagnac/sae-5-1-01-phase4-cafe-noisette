package fr.iut.blagnac.invites.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import fr.iut.blagnac.invites.enums.InviteState;
import fr.iut.blagnac.users.dtos.PlayerInfoDTO;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.enums.UserRole;
import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RegisterForReflection
public class InviteDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("senderId")
    private UserDTO senderId;

    @JsonProperty("receiverId")
    private UserDTO receiverId;

    @JsonProperty("teamId")
    private Long teamId;

    @JsonProperty("inviteState")
    private InviteState inviteState;

}
