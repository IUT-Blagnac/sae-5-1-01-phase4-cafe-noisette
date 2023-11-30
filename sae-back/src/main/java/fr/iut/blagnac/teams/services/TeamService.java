package fr.iut.blagnac.teams.services;

import java.util.ArrayList;

import jakarta.ws.rs.core.SecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.exceptions.SAE5ManagementExceptionTypes;
import fr.iut.blagnac.projects.entities.ProjectEntity;
import fr.iut.blagnac.projects.repositories.ProjectRepository;
import fr.iut.blagnac.teams.dtos.TeamDTO;
import fr.iut.blagnac.teams.entities.TeamEntity;
import fr.iut.blagnac.teams.mappers.TeamMapper;
import fr.iut.blagnac.teams.repositories.TeamRepository;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.mappers.UserMapper;
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

    
    public TeamDTO getTeam(Long id, SecurityContext securityContext) {
        try {
            TeamEntity teamEntity = teamRepository.findById(id);

            if (teamEntity == null) {
                LOGGER.error("Team not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.TEAM_NOT_FOUND);
            }

            if(!checkIfUserIsInTeam(securityContext, teamEntity, true)) {
                LOGGER.error("User not in this team");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_IN_TEAM);
            }

            TeamDTO teamDTO = TeamMapper.toDTO(teamEntity);

            return teamDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public TeamDTO getTeamByName(String name){
        try{
            TeamEntity teamEntity = teamRepository.findByName(name);

            if(teamEntity == null) {
                LOGGER.error("User not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
            }

            TeamDTO teamDTO = TeamMapper.toDTO(teamEntity);

            return teamDTO;
        } catch (PersistenceException e){
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public TeamDTO getTeamByUser(Long id){
        try{
            UserEntity user = userRepository.findById(id);
            TeamEntity teamEntity = teamRepository.findByUser(user);

            if (teamEntity == null) {
                LOGGER.error("User not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
            }

            TeamDTO teamDTO = TeamMapper.toDTO(teamEntity);
            return teamDTO;

         } catch (PersistenceException e){
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
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

            teamRepository.persist(teamEntity);
            
            ArrayList<UserEntity> teamMembersEntities = new ArrayList<>();
            teamDTO.getMembersId().forEach(t -> {
                UserEntity user = userRepository.findById(t);
                user.setTeam(teamEntity);
                teamMembersEntities.add(user);
            });
            teamEntity.setMembers(teamMembersEntities);
           
            return TeamMapper.toDTO(teamEntity);

        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public TeamDTO addMember(TeamDTO teamDTO, UserDTO userDTO) {
        try {
            TeamEntity teamEntity = TeamMapper.toEntity(teamDTO);
            UserEntity userEntity = UserMapper.toEntity(userDTO);

            if (userEntity.getTeam() != null) {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.ALREADY_IN_TEAM);
            }

            ArrayList<UserEntity> dtoTeamMembers;
            dtoTeamMembers = teamEntity.getMembers();
            dtoTeamMembers.add(userEntity);

            return TeamMapper.toDTO(teamEntity);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    private boolean checkIfUserIsInTeam(SecurityContext securityContext, TeamEntity teamEntity, boolean adminBypass) {
        if (adminBypass && securityContext.isUserInRole("ADMIN")) {
            return true;
        }
        UserEntity userEntity = userRepository.findByUsername(securityContext.getUserPrincipal().getName());
        if (userEntity.getTeam() == null) {
            return false;
        }
        return userEntity.getTeam().getId().equals(teamEntity.getId());
    }
}
