package fr.iut.blagnac.project.mappers;

import fr.iut.blagnac.project.dtos.ProjectDTO;
import fr.iut.blagnac.project.entities.ProjectEntity;
import fr.iut.blagnac.users.mappers.UserMapper;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ProjectMapper {

    public static ProjectEntity toEntity(ProjectDTO dto) {
        ProjectEntity entity = new ProjectEntity();
        entity.setId(dto.getId());
        entity.setNom(dto.getNom());
        entity.setDesc(dto.getDesc());

        return entity;
    }

    public static ProjectDTO toDTO(ProjectEntity entity) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(entity.getId());
        dto.setNom(entity.getNom());
        dto.setDesc(entity.getDesc());

        if(entity.getContact() != null) {
            dto.setContact(UserMapper.toDTO(entity.getContact()));
        }

        return dto;
    }

}
