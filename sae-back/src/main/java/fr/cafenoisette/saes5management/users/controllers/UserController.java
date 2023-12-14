package fr.cafenoisette.saes5management.users.controllers;

import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.users.dtos.PlayerInfoDTO;
import fr.cafenoisette.saes5management.users.dtos.subdtos.ClientUserDTO;
import fr.cafenoisette.saes5management.users.dtos.subdtos.StudentUserDTO;
import fr.cafenoisette.saes5management.users.enums.UserRole;
import fr.cafenoisette.saes5management.users.dtos.UserDTO;
import fr.cafenoisette.saes5management.users.services.UserService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.List;

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
    @RolesAllowed({"ADMIN"})
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
                List<UserDTO> userTab = userService.getUsersByRole(role);
                return Response.ok(userTab).build();
            } else {
                List<UserDTO> userTab = userService.getUsers();
                return Response.ok(userTab).build();
            }
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @GET
    @RolesAllowed("**")
    @Path("/students/filter")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStudents(
            @QueryParam("id") Long id,
            @QueryParam("username") String username,
            @QueryParam("firstname") String firstname,
            @QueryParam("lastname") String lastname,
            @QueryParam("teamId") Long teamId
    ) {
        try {
            List<StudentUserDTO> userTab = userService.getStudents(id, username, firstname, lastname, teamId);
            return Response.ok(userTab).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @GET
    @RolesAllowed("**")
    @Path("/clients/filter")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getContacts(
            @QueryParam("id") Long id,
            @QueryParam("username") String username,
            @QueryParam("firstname") String firstname,
            @QueryParam("lastname") String lastname,
            @QueryParam("email") String email
    ) {
        try {
            List<ClientUserDTO> userTab = userService.getClients(id, username, firstname, lastname, email);
            return Response.ok(userTab).build();
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

    @PUT
    @RolesAllowed("ADMIN")
    @Path("/admin/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response adminUpdateUser(UserDTO userDTO) {
        try {
            if (userDTO == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            UserDTO user = userService.adminUpdateUser(userDTO);
            return Response.ok(user).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @PUT
    @RolesAllowed({"ADMIN", "STUDENT_INIT", "STUDENT_ALT"})
    @Path("/{userId}/addPreferences")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addPreferences(@PathParam("userId")Long userId, PlayerInfoDTO playerInfoDTO) {
        try {
            if (playerInfoDTO == null || userId == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            UserDTO user = userService.addPreferences(userId, playerInfoDTO, securityContext);
            return Response.ok(user).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }
}
