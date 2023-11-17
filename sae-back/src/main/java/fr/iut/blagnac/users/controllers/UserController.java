package fr.iut.blagnac.users.controllers;

import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.services.UserService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@Path("/users")
public class UserController {

    @Inject
    UserService userService;

    @GET
    @RolesAllowed({"ADMIN"})
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("id") String id) {
        if (id == null || id.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        UserDTO userDTO = userService.getUser(Long.parseLong(id));

        return Response.ok(userDTO).build();
    }

    @POST
    @PermitAll
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(UserDTO userDTO) {
        if (userDTO == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        UserDTO user = userService.createUser(userDTO);
        return Response.ok(user).build();
    }

}
