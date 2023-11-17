package fr.iut.blagnac.authentication.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class AuthResponse {

    private String token;
}
