package fr.iut.blagnac.teams.mappers;

import fr.iut.blagnac.authentication.utils.PBKDF2Encoder;
import fr.iut.blagnac.project.controller.ProjectController;
import fr.iut.blagnac.project.entities.ProjectEntity;
import fr.iut.blagnac.project.mappers.ProjectMapper;
import fr.iut.blagnac.teams.dtos.TeamDTO;
import fr.iut.blagnac.teams.entities.TeamEntity;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.mappers.PlayerInfoMapper;
import fr.iut.blagnac.users.mappers.UserMapper;
import io.vertx.mutiny.ext.auth.User;

public class TeamMapper {

    public static TeamEntity toEntity(TeamDTO dto) {
        TeamEntity entity = new TeamEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setGithub(dto.getGithub());
        entity.setMembers(dto.getMembers());

        return entity;
    }

    public static TeamDTO toDTO(TeamEntity entity) {
        TeamDTO dto = new TeamDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setGithub(entity.getGithub());
        dto.setMembers(entity.getMembers());

        if(entity.getLeader() != null) {
             dto.setLeader(UserMapper.toDTO(entity.getLeader()));;
        }
        
        if(entity.getProject() != null) {
             dto.setProject(ProjectMapper.toDTO(entity.getProject()));
        }

        return dto;
    
}
}
