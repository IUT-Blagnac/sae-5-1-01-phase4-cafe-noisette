package fr.iut.blagnac.teams.controllers;

import fr.iut.blagnac.teams.dtos.TeamDTO;
import fr.iut.blagnac.teams.services.TeamService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@Path("/teams")
public class TeamController {
      @Inject
    TeamService teamService;

    @GET
    @RolesAllowed({"ADMIN"})
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("id") String id) {
        if (id == null || id.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        TeamDTO teamDTO = teamService.getTeam(Long.parseLong(id));

        return Response.ok(teamDTO).build();
    }

    @POST
    @PermitAll
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(TeamDTO teamDTO) {
        if (teamDTO == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        TeamDTO team = teamService.createTeam(teamDTO);
        return Response.ok(team).build();
    }

    @GET
    @Path("/user/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTeamByUser(Long id) {
        if (id == null){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
         TeamDTO team = teamService.getTeamByUser(id);
         return Response.ok(team).build();
    }

}

