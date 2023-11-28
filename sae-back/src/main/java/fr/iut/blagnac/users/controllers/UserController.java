package fr.iut.blagnac.users.controllers;

import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.enums.UserRole;
import fr.iut.blagnac.users.services.UserService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@ApplicationScoped
@Path("/users")
public class UserController {

    @Inject
    UserService userService;

    @Inject
    SecurityContext securityContext;

    public Response getUserById(String id) {
        if (id == null || id.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        UserDTO userDTO = userService.getUserById(Long.parseLong(id), securityContext);

        return Response.ok(userDTO).build();
    }

    public Response getUserByUsername(String username) {
        if (username == null || username.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        UserDTO userDTO = userService.getUserByUsername(username, securityContext);

        return Response.ok(userDTO).build();
    }

    @GET
    @RolesAllowed("**")
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers(
            @QueryParam("id") Long id,
            @QueryParam("username") String username,
            @QueryParam("role") UserRole role
    ) {
        try {
            if (id != null) {
                return getUserById(id.toString());
            } else if (username != null) {
                return getUserByUsername(username);
            } else if (role != null) {
                UserDTO[] userTab = userService.getUsersByRole(role);
                return Response.ok(userTab).build();
            }
            return Response.status(Response.Status.BAD_REQUEST).build();

        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @GET
    @RolesAllowed("**")
    @Path("/me")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMe() {
        try {
            UserDTO userDTO = userService.getUserByUsername(securityContext.getUserPrincipal().getName(), securityContext);
            return Response.ok(userDTO).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @POST
    @PermitAll
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(UserDTO userDTO) {
        try {
            if (userDTO == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            UserDTO user = userService.createUser(userDTO);
            return Response.ok(user).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }
}
