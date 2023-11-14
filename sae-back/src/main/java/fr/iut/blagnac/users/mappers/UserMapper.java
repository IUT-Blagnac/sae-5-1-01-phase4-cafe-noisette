package fr.iut.blagnac.users.mappers;

import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.entities.UserEntity;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class UserMapper {

    public static UserEntity toEntity(UserDTO dto) {
        UserEntity entity = new UserEntity();
        entity.setId(dto.getId());
        entity.setUsername(dto.getUsername());
        entity.setFirstname(dto.getFirstname());
        return entity;
    }

    public static UserDTO toDTO(UserEntity entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setFirstname(entity.getFirstname());
        return dto;
    }

}
