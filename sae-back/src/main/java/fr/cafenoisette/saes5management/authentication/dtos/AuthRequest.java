package fr.cafenoisette.saes5management.authentication.dtos;

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
