package fr.cafenoisette.saes5management.projects.mappers;

import fr.cafenoisette.saes5management.projects.dtos.ProjectDTO;
import fr.cafenoisette.saes5management.projects.entities.ProjectEntity;
import fr.cafenoisette.saes5management.users.dtos.UserDTO;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import fr.cafenoisette.saes5management.users.mappers.UserMapper;
import io.quarkus.runtime.annotations.RegisterForReflection;

import java.util.*;

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
        if(entity.getClients() != null) {
            Set<UserEntity> userList = entity.getClients();
            Set<Long> idList = new LinkedHashSet<>();
            for(UserEntity user : userList) {
                UserDTO userDTO = UserMapper.toDTO(user);
                idList.add(userDTO.getId());
            }
            dto.setClientIds(idList);
        }

        return dto;
    }

}
