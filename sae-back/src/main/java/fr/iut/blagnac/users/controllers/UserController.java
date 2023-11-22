package fr.iut.blagnac.users.controllers;

import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.users.dtos.UserDTO;
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

    @GET
    @RolesAllowed("**")
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("id") String id) {
        try {
            if (id == null || id.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            UserDTO userDTO = userService.getUser(Long.parseLong(id), securityContext);

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
