package fr.cafenoisette.saes5management.users.mappers;

import fr.cafenoisette.saes5management.users.entities.PlayerInfoEntity;
import fr.cafenoisette.saes5management.users.dtos.PlayerInfoDTO;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class PlayerInfoMapper {

    public static PlayerInfoEntity toEntity(PlayerInfoDTO dto) {
        PlayerInfoEntity entity = new PlayerInfoEntity();
        
        entity.setId(dto.getId());
        entity.setNickname(dto.getNickname());
        entity.setGlobalLevel(dto.getGlobalLevel());
        entity.setChiefLevel(dto.getChiefLevel());
        entity.setBackLevel(dto.getBackLevel());
        entity.setFrontLevel(dto.getFrontLevel());
        entity.setDocLevel(dto.getDocLevel());
        entity.setGitLevel(dto.getGitLevel());
        entity.setTestLevel(dto.getTestLevel());
        entity.setDesignLevel(dto.getDesignLevel());
        entity.setOtherDesc(dto.getOtherDesc());
        entity.setOtherLevel(dto.getOtherLevel());
        return entity;
    }

    public static PlayerInfoDTO toDTO(PlayerInfoEntity entity) {
        PlayerInfoDTO dto = new PlayerInfoDTO();
        dto.setId(entity.getId());
        dto.setNickname(entity.getNickname());
        dto.setGlobalLevel(entity.getGlobalLevel());
        dto.setChiefLevel(entity.getChiefLevel());
        dto.setBackLevel(entity.getBackLevel());
        dto.setFrontLevel(entity.getFrontLevel());
        dto.setDocLevel(entity.getDocLevel());
        dto.setGitLevel(entity.getGitLevel());
        dto.setTestLevel(entity.getTestLevel());
        dto.setDesignLevel(entity.getDesignLevel());
        dto.setOtherDesc(entity.getOtherDesc());
        dto.setOtherLevel(entity.getOtherLevel());
        return dto;
    }
}
