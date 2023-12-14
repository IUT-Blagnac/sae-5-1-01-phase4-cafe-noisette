package fr.cafenoisette.saes5management.grades.mappers;

import fr.cafenoisette.saes5management.grades.dtos.GradeDTO;
import fr.cafenoisette.saes5management.grades.entities.GradeEntity;

public class GradeMapper {

    public static GradeEntity toEntity(GradeDTO dto) {
        GradeEntity entity = new GradeEntity();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setGrade(dto.getGrade());
        entity.setCoefficient(dto.getCoefficient());
        entity.setType(dto.getType());

        return entity;
    }

    public static GradeDTO toDTO(GradeEntity entity) {
        GradeDTO dto = new GradeDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setGrade(entity.getGrade());
        dto.setCoefficient(entity.getCoefficient());
        dto.setType(entity.getType());
        dto.setStudentId(entity.getStudent().getId());

        return dto;
    }
}
