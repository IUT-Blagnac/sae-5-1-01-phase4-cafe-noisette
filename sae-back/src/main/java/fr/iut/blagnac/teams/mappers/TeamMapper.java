package fr.iut.blagnac.teams.mappers;

import fr.iut.blagnac.project.mappers.ProjectMapper;
import fr.iut.blagnac.teams.dtos.TeamDTO;
import fr.iut.blagnac.teams.entities.TeamEntity;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.mappers.UserMapper;

import java.util.ArrayList;

public class TeamMapper {

    public static TeamEntity toEntity(TeamDTO dto) {
        TeamEntity entity = new TeamEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setGithub(dto.getGithub());

        ArrayList<UserEntity> entityTeamMembers = new ArrayList<>();
        dto.getMembers().forEach(member -> {
            entityTeamMembers.add(UserMapper.toEntity(member));
        });

        entity.setMembers(entityTeamMembers);


        return entity;
    }

    public static TeamDTO toDTO(TeamEntity entity) {
        TeamDTO dto = new TeamDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setGithub(entity.getGithub());

        ArrayList<UserDTO> dtoTeamMembers = new ArrayList<>();
        entity.getMembers().forEach(member -> {
            dtoTeamMembers.add(UserMapper.toDTO(member));
        });

        dto.setMembers(dtoTeamMembers);

        if(entity.getLeader() != null) {
            dto.setLeader(UserMapper.toDTO(entity.getLeader()));;
        }

        if(entity.getProject() != null) {
            dto.setProject(ProjectMapper.toDTO(entity.getProject()));
        }

        return dto;
    }
}
