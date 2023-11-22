package fr.iut.blagnac.teams.services;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iut.blagnac.project.entities.ProjectEntity;
import fr.iut.blagnac.project.repositories.ProjectRepository;
import fr.iut.blagnac.teams.dtos.TeamDTO;
import fr.iut.blagnac.teams.entities.TeamEntity;
import fr.iut.blagnac.teams.mappers.TeamMapper;
import fr.iut.blagnac.teams.repositories.TeamRepository;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class TeamService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TeamService.class);

    @Inject
    TeamRepository teamRepository;
    
    @Inject
    UserRepository userRepository;

    @Inject
    ProjectRepository projectRepository;

    
    public TeamDTO getTeam(Long id) {
        try {
            TeamEntity teamEntity = teamRepository.findById(id);

            if (teamEntity == null) {
                LOGGER.error("User not found");
                return null;
            }

            TeamDTO teamDTO = TeamMapper.toDTO(teamEntity);

            return teamDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw e;
        }
    }

    public TeamDTO getUserByName(String name){
        try{
            TeamEntity teamEntity = teamRepository.findByName(name);

            if(teamEntity == null) {
                LOGGER.error("User not found");
                return null;
            }

            TeamDTO teamDTO = TeamMapper.toDTO(teamEntity);

            return teamDTO;
        } catch (PersistenceException e){
            LOGGER.error("Error while getting user", e);
            throw e;
        }
    }

    @Transactional
    public TeamDTO createTeam(TeamDTO teamDTO) {
        try {
            TeamEntity teamEntity = TeamMapper.toEntity(teamDTO);
            
            UserEntity leader = userRepository.findById(teamDTO.getLeaderId());
            teamEntity.setLeader(leader);

            ProjectEntity project = projectRepository.findById(teamDTO.getProjectId());
            teamEntity.setProject(project);

            ArrayList<UserEntity> teamMembersEntities = new ArrayList<>();
            teamDTO.getMembersId().forEach(t -> teamMembersEntities.add(userRepository.findById(t)));
            teamEntity.setMembers(teamMembersEntities);



            teamRepository.persist(teamEntity);
           
            return TeamMapper.toDTO(teamEntity);

        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw e;
        }
    }
}
