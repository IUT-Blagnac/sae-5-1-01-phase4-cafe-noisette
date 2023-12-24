package fr.cafenoisette.saes5management.teams.mappers;

import fr.cafenoisette.saes5management.projects.entities.ProjectEntity;
import fr.cafenoisette.saes5management.teams.entities.TeamEntity;
import fr.cafenoisette.saes5management.teams.dtos.TeamDTO;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

        Set<Long> dtoTeamMembers = new HashSet<>();
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

        if(entity.getPreferences() != null) {
            List<Long> idList = new ArrayList<Long>();
            for(ProjectEntity project : entity.getPreferences()) {
                idList.add(project.getId());
            }
            dto.setPreferencesId(idList);
        }

        return dto;
    }
}
