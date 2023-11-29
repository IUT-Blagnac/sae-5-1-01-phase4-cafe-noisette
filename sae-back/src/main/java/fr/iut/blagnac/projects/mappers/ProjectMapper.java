package fr.iut.blagnac.projects.mappers;

import fr.iut.blagnac.projects.dtos.ProjectDTO;
import fr.iut.blagnac.projects.entities.ProjectEntity;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.mappers.UserMapper;
import io.quarkus.runtime.annotations.RegisterForReflection;

import java.util.ArrayList;
import java.util.Collection;

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
        if(entity.getContacts() != null) {
            Collection<UserEntity> userList = entity.getContacts();
            Collection<Long> idList = new ArrayList<Long>();;
            for(UserEntity user : userList) {
                UserDTO userDTO = UserMapper.toDTO(user);
                idList.add(userDTO.getId());
            }
            dto.setContactIds(idList);
        }

        return dto;
    }

}
