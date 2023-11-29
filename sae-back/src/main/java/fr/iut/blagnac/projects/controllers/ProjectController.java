package fr.iut.blagnac.projects.controllers;

import fr.iut.blagnac.projects.dtos.ProjectDTO;
import fr.iut.blagnac.projects.services.ProjectService;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@Path("/projects")
public class ProjectController {

    @Inject
    ProjectService projectService;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProject(@PathParam("id") String id) {
        if (id == null || id.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        ProjectDTO projectDTO = projectService.getProject(Long.parseLong(id));

        return Response.ok(projectDTO).build();
    }

    @POST
    @PermitAll
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createProject(ProjectDTO projectDTO) {
        if (projectDTO == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        ProjectDTO project = projectService.createProject(projectDTO);
        return Response.ok(project).build();
    }

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjects() {
        ProjectDTO[] projectDTOs = projectService.getProjects();

        return Response.ok(projectDTOs).build();

    }


}
