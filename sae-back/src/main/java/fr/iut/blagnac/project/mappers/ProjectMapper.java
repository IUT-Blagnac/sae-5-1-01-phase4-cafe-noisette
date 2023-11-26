package fr.iut.blagnac.project.mappers;

import fr.iut.blagnac.project.dtos.ProjectDTO;
import fr.iut.blagnac.project.entities.ProjectEntity;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.mappers.UserMapper;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ProjectMapper {

    public static ProjectEntity toEntity(ProjectDTO dto) {
        ProjectEntity entity = new ProjectEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        return entity;
    }

    public static ProjectDTO toDTO(ProjectEntity entity) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        if(entity.getContact() != null) {
            UserDTO userDTO = UserMapper.toDTO(entity.getContact());
            dto.setContactId(userDTO.getId());
        }

        return dto;
    }

}
