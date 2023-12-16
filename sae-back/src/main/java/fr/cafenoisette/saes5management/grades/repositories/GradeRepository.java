package fr.cafenoisette.saes5management.grades.repositories;

import fr.cafenoisette.saes5management.grades.entities.GradeEntity;
import fr.cafenoisette.saes5management.grades.enums.GradeType;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ArrayList;

@ApplicationScoped
public class GradeRepository implements PanacheRepository<GradeEntity>  {

    public GradeEntity findByTitle(String title) {
        return find("title", title).firstResult();
    }
    
    /**
     * Get all grades or a grade by id, title, description, grade, coefficient, type or teamId, each parameter is optional and can be combined
     *
     * @param id          id of the grade
     * @param title       title of the grade
     * @param description description of the grade
     * @param nGrade      the grade (/20)
     * @param coefficient the grade
     * @param type        the grade
     * @param teamId      the id of the team graded
     * @return a list of grades
     */
    public ArrayList<GradeEntity> getFilteredGrades(Long id, String title, String description, Long nGrade, Long coefficient, GradeType type, Long teamId) {
        // get all grades
        ArrayList<GradeEntity> grades = new ArrayList<>(listAll());
        
        // if id is not null, remove all grades that don't have this id
        if (id != null) {
            grades.removeIf(grade -> !grade.getId().equals(id));
        }
        
        // if title is not null, remove all grades that don't have this name
        if (title != null) {
            grades.removeIf(grade -> !grade.getTitle().equals(title));
        }
        
        // if description is not null, remove all grades that don't have this description
        if (description != null) {
            grades.removeIf(grade -> !grade.getDescription().equals(description));
        }
        // if nGrade is not null, remove all grades that don't have this grade
        if (nGrade != null) {
            grades.removeIf(grade -> !grade.getGrade().equals(nGrade));
        }

        // if coefficient is not null, remove all grades that don't have this coefficient
        if (coefficient != null) {
            grades.removeIf(grade -> !grade.getCoefficient().equals(coefficient));
        }

        // if type is not null, remove all grades that don't have this type
        if (type != null) {
            grades.removeIf(grade -> !grade.getType().equals(type));
        }

        if (teamId != null) {
            grades.removeIf(grade -> !grade.getTeam().getId().equals(teamId));
        }


        // return the list of grades
        return grades;
    }
}
