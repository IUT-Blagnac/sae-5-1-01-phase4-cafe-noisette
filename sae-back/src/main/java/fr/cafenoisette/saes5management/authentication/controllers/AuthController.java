package fr.cafenoisette.saes5management.authentication.controllers;

import fr.cafenoisette.saes5management.authentication.dtos.AuthRequest;
import fr.cafenoisette.saes5management.constants.AuthConstants;
import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.authentication.dtos.AuthResponse;
import fr.cafenoisette.saes5management.authentication.utils.PBKDF2Encoder;
import fr.cafenoisette.saes5management.authentication.utils.TokenUtils;
import fr.cafenoisette.saes5management.users.dtos.UserDTO;
import fr.cafenoisette.saes5management.users.services.UserService;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@ApplicationScoped
public class AuthController {
    @Inject
    PBKDF2Encoder passwordEncoder;

    @Inject
    UserService userService;

    private static final Long duration = AuthConstants.DURATION;
    private static final String issuer = AuthConstants.ISSUER;

    @POST
    @PermitAll
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(AuthRequest authRequest) {
        try {
            UserDTO userDTO = userService.checkPassword(authRequest);
            try {
                return Response.ok(new AuthResponse(TokenUtils.generateToken(userDTO.getUsername(), userDTO.getRoles(), duration, issuer))).build();
            } catch (Exception e) {
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

}
