package fr.cafenoisette.saes5management.teams.controllers;

import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.teams.dtos.TeamDTO;
import fr.cafenoisette.saes5management.teams.services.TeamService;
import fr.cafenoisette.saes5management.users.dtos.UserDTO;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Path("/teams")
public class TeamController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TeamController.class);

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
    @RolesAllowed({"STUDENT_INIT", "ADMIN"})
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
    public Response getTeams(
            @QueryParam("id") Long id,
            @QueryParam("name") String name,
            @QueryParam("projectId") Long projectId,
            @QueryParam("leaderId") Long leaderId
    ) {
        try {
            ArrayList<TeamDTO> teamDTOs = teamService.getFilteredTeams(id, name, projectId, leaderId);
            return Response.ok(teamDTOs).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @PUT
    @RolesAllowed({"ADMIN","STUDENT_INIT"})
    @Path("/{teamId}/addMember")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addTeamMember(@PathParam("teamId")Long teamId, UserDTO userDTO) {
        try {
            if (teamId == null || userDTO == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
           TeamDTO team = teamService.addMember(teamId, userDTO, securityContext);
           return Response.ok(team).build();

        } catch (SAE5ManagementException sme) {
           return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }

    }

    @PUT
    @RolesAllowed({"ADMIN","STUDENT_INIT"})
    @Path("/{teamId}/addPreferences")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addPreferences(@PathParam("teamId")Long teamId, TeamDTO placeholderTeam) {
        List<Long> projectIds = placeholderTeam.getPreferencesId();
        try {
            if (teamId == null || projectIds == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            TeamDTO team = teamService.addPreferences(teamId,projectIds,securityContext);
            return Response.ok(team).build();

        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @PUT
    @RolesAllowed({"ADMIN","TEACHER"})
    @Path("/{teamId}/addProject")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addProject(@PathParam("teamId") Long teamId, TeamDTO placeholderTeam) {
        Long projectId = placeholderTeam.getProjectId();
        try {
            if (teamId == null || projectId == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            TeamDTO team = teamService.addProject(teamId,projectId,securityContext);
            return Response.ok(team).build();

        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @DELETE
    @RolesAllowed({"ADMIN","TEACHER"})
    @Path("/{teamId}/removeProject")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeProject(@PathParam("teamId") Long teamId, TeamDTO placeholderTeam) {
        Long projectId = placeholderTeam.getProjectId();
        try {
            if (teamId == null || projectId == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            teamService.removeProject(teamId, securityContext);
            return Response.ok().build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }
}
