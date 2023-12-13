package fr.cafenoisette.saes5management.projects.controllers;

import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.projects.dtos.ProjectDTO;
import fr.cafenoisette.saes5management.projects.services.ProjectService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.ArrayList;

@ApplicationScoped
@Path("/projects")
public class ProjectController {

    @Inject
    ProjectService projectService;

    @Inject
    SecurityContext securityContext;

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
    @RolesAllowed({"TEACHER", "ADMIN"})
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createProject(ProjectDTO projectDTO) {
        try {
            if (projectDTO == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            ProjectDTO project = projectService.createProject(projectDTO, securityContext);
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

    @PUT
    @RolesAllowed({"TEACHER", "ADMIN","CLIENT"})
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateProject(ProjectDTO changedProject) {
        try {
            ProjectDTO updatedProject = projectService.updateProject(changedProject, securityContext);

            return Response.ok(updatedProject).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }

    }


    @DELETE
    @RolesAllowed({"TEACHER", "ADMIN","CLIENT"})
    @Path("/delete/{projectId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteProject(@PathParam("projectId")Long projectId) {
        try {
            projectService.deleteProject(projectId, securityContext);

            return Response.accepted().build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }

    }
}
