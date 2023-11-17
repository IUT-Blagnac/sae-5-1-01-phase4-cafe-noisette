package fr.iut.blagnac.authentication.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class AuthRequest {

    private String username;
    private String password;
}
