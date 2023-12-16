package fr.cafenoisette.saes5management.grades.controllers;

import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.grades.dtos.GradeDTO;
import fr.cafenoisette.saes5management.grades.enums.GradeType;
import fr.cafenoisette.saes5management.grades.services.GradeService;
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


@ApplicationScoped
@Path("/grades")
public class GradeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GradeController.class);

    @Inject
    GradeService gradeService;

    @Inject
    SecurityContext securityContext;

    @GET
    @RolesAllowed({"**"})
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGrade(@PathParam("id") String id) {
        try {
            if (id == null || id.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            GradeDTO gradeDTO = gradeService.getGrade(Long.parseLong(id), securityContext);

            return Response.ok(gradeDTO).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @GET
    @RolesAllowed("**")
    @Path("/filter")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGrades(
            @QueryParam("id") Long id,
            @QueryParam("title") String title,
            @QueryParam("description") String description,
            @QueryParam("grade") Long grade,
            @QueryParam("coefficient") Long coeff,
            @QueryParam("type") GradeType type,
            @QueryParam("teamId") Long teamId
    ) {
        try {
            ArrayList<GradeDTO> gradeDTOS = gradeService.getFilteredGrades(id, title, description, grade, coeff, type, teamId);
            return Response.ok(gradeDTOS).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @POST
    @RolesAllowed({"TEACHER", "CLIENT", "ADMIN"})
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createGrade(GradeDTO gradeDTO) {
        try {
            if (gradeDTO == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            GradeDTO grade = gradeService.createGrade(gradeDTO, securityContext);
            return Response.ok(grade).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @PUT
    @RolesAllowed({"TEACHER", "CLIENT", "ADMIN"})
    @Path("/{gradeId}/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateGrade(@PathParam("gradeId") Long gradeId, GradeDTO gradeDTO) {
        try {
            if (gradeDTO == null || gradeId == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            GradeDTO grade = gradeService.updateGrade(gradeId, gradeDTO, securityContext);
            return Response.ok(grade).build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

    @DELETE
    @RolesAllowed({"TEACHER", "CLIENT", "ADMIN"})
    @Path("/{gradeId}/delete")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteGrade(@PathParam("gradeId") Long gradeId) {
        try {
            if (gradeId == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            gradeService.deleteGrade(gradeId, securityContext);
            return Response.ok().build();
        } catch (SAE5ManagementException sme) {
            return Response.status(sme.getStatus()).entity(sme.getMessage()).build();
        }
    }

}
