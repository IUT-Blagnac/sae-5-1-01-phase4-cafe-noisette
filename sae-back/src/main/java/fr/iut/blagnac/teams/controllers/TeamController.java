package fr.iut.blagnac.teams.controllers;

import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.teams.dtos.TeamDTO;
import fr.iut.blagnac.teams.services.TeamService;
import fr.iut.blagnac.users.dtos.UserDTO;
import io.vertx.mutiny.ext.auth.User;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@ApplicationScoped
@Path("/teams")
public class TeamController {

    @Inject
    TeamService teamService;

    @Inject
    SecurityContext securityContext;

    @GET
    @RolesAllowed({"**"})
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTeam(@PathParam("id") String id) {
        try {
            if (id == null || id.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            TeamDTO teamDTO = teamService.getTeam(Long.parseLong(id), securityContext);

            return Response.ok(teamDTO).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @POST
    @RolesAllowed({"STUDENT_INIT"})
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createTeam(TeamDTO teamDTO) {
        try {
            if (teamDTO == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            TeamDTO team = teamService.createTeam(teamDTO);
            return Response.ok(team).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @GET
    @RolesAllowed("**")
    @Path("/filter")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTeamByUser(@QueryParam("userId") Long userId) {
        try {
            if (userId == null){
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            TeamDTO team = teamService.getTeamByUser(userId);
            return Response.ok(team).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @PUT
    @RolesAllowed({"ADMIN","STUDENT_INIT"})
    @Path("/teams/{teamId}/addMember")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addTeamMember(@PathParam("teamId")Long teamId, UserDTO userDTO) {
        
        try {
            if (teamId == null || userDTO == null) {
                    return Response.status(Response.Status.BAD_REQUEST).build();
            }
           TeamDTO team = teamService.addMember(teamId,userDTO,securityContext);
           return Response.ok(team).build();
           
        } catch (SAE5ManagementException sme) {
           return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
    }

    }
}

