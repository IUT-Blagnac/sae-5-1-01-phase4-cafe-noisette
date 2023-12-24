package fr.cafenoisette.saes5management.users.mappers;

import fr.cafenoisette.saes5management.authentication.utils.PBKDF2Encoder;
import fr.cafenoisette.saes5management.users.dtos.subdtos.ClientUserDTO;
import fr.cafenoisette.saes5management.users.dtos.subdtos.StudentUserDTO;
import fr.cafenoisette.saes5management.users.dtos.UserDTO;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class UserMapper {

    public static UserEntity toEntityWithoutRoles(UserDTO dto) {
        UserEntity entity = new UserEntity();
        entity.setId(dto.getId());
        entity.setUsername(dto.getUsername());
        entity.setFirstname(dto.getFirstname());
        entity.setLastname(dto.getLastname());
        entity.setEmail(dto.getEmail());

        PBKDF2Encoder encoder = new PBKDF2Encoder();

        entity.setPassword(encoder.encode(dto.getPassword()));


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

    public static StudentUserDTO toStudentDTO(UserEntity userEntity) {
        StudentUserDTO studentUserDTO = new StudentUserDTO();
        studentUserDTO.setId(userEntity.getId());
        studentUserDTO.setUsername(userEntity.getUsername());
        studentUserDTO.setFirstname(userEntity.getFirstname());
        studentUserDTO.setLastname(userEntity.getLastname());
        studentUserDTO.setRoles(userEntity.getRoles());

        if (userEntity.getPlayerInfo() != null) {
            studentUserDTO.setPlayerInfo(PlayerInfoMapper.toDTO(userEntity.getPlayerInfo()));
        }

        if (userEntity.getTeam() != null) {
            studentUserDTO.setTeamId(userEntity.getTeam().getId());
        }

        return studentUserDTO;
    }

    public static ClientUserDTO toClientDTO(UserEntity userEntity) {
        ClientUserDTO clientUserDTO = new ClientUserDTO();
        clientUserDTO.setId(userEntity.getId());
        clientUserDTO.setUsername(userEntity.getUsername());
        clientUserDTO.setFirstname(userEntity.getFirstname());
        clientUserDTO.setLastname(userEntity.getLastname());
        clientUserDTO.setEmail(userEntity.getLastname());
        clientUserDTO.setRoles(userEntity.getRoles());

        return clientUserDTO;
    }

}
