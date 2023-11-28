package fr.iut.blagnac.users.mappers;

import fr.iut.blagnac.authentication.utils.PBKDF2Encoder;
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
        entity.setLastname(dto.getLastname());
        entity.setEmail(dto.getEmail());

        PBKDF2Encoder encoder = new PBKDF2Encoder();

        entity.setPassword(encoder.encode(dto.getPassword()));
        entity.setRoles(dto.getRoles());

//        if(dto.getPlayerInfo() != null){
//            entity.setPlayerInfo(PlayerInfoMapper.toEntity(dto.getPlayerInfo()));
//        }
        
        return entity;
    }

    public static UserDTO toDTO(UserEntity entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setFirstname(entity.getFirstname());
        dto.setLastname(entity.getLastname());
        dto.setEmail(entity.getEmail());
        dto.setRoles(entity.getRoles());

        if(entity.getPlayerInfo() != null) {
             dto.setPlayerInfo(PlayerInfoMapper.toDTO(entity.getPlayerInfo()));
        }


        if(entity.getTeam() != null) {
            dto.setTeamId(entity.getTeam().getId());
        }

        return dto;
    }

}
