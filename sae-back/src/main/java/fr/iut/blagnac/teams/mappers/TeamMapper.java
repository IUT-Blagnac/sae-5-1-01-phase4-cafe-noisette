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

        return entity;
    }

    public static TeamDTO toDTO(TeamEntity entity) {
        TeamDTO dto = new TeamDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setGithub(entity.getGithub());

        ArrayList<Long> dtoTeamMembers = new ArrayList<>();
        entity.getMembers().forEach(member -> {
            dtoTeamMembers.add(member.getId());
        });
        
        dto.setMembersId(dtoTeamMembers);
        
       

        if(entity.getLeader() != null) {
            dto.setLeaderId(entity.getLeader().getId());
        }

        if(entity.getProject() != null) {
            dto.setProjectId(entity.getProject().getId());
        }

        return dto;
    }
}
