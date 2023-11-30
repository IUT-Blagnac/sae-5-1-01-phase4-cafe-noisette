package fr.iut.blagnac.projects.controllers;

import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.projects.dtos.ProjectDTO;
import fr.iut.blagnac.projects.services.ProjectService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;

@ApplicationScoped
@Path("/projects")
public class ProjectController {

    @Inject
    ProjectService projectService;

    @GET
    @RolesAllowed("**")
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProject(@PathParam("id") String id) {
        try {
            if (id == null || id.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            ProjectDTO projectDTO = projectService.getProject(Long.parseLong(id));

            return Response.ok(projectDTO).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @POST
    @RolesAllowed({"TEACHER"})
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createProject(ProjectDTO projectDTO) {
        try {
            if (projectDTO == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            ProjectDTO project = projectService.createProject(projectDTO);
            return Response.ok(project).build();
        } catch (
                SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @GET
    @RolesAllowed("**")
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProjects() {
        try {
            ArrayList<ProjectDTO> projectDTOs = projectService.getProjects();

            return Response.ok(projectDTOs).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }

    }


}
