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
import fr.iut.blagnac.users.enums.UserRole;
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
    public TeamDTO addMember(Long teamId , UserDTO userDTO, SecurityContext securityContext) {
        try {
            UserEntity userEntity = userRepository.findByUsername(securityContext.getUserPrincipal().getName());

            if (userEntity == null) {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
            }

            if (
                securityContext.isUserInRole("ADMIN") || 
                userEntity.getTeam().getId().equals(teamId) && userEntity.getTeam().getLeader().getId().equals(userEntity.getId())
              ) {
                TeamEntity teamEntity = userEntity.getTeam();
                UserEntity targetEntity;

                if (userDTO.getId() != null) {
                    targetEntity = userRepository.findById(userDTO.getId());
                } else if (userDTO.getUsername() != null){
                    targetEntity = userRepository.findByUsername(userDTO.getUsername());
                } else {
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.BAD_REQUEST);
                }

                if (
                    targetEntity != null && 
                    targetEntity.getTeam() != null && 
                    (targetEntity.getRoles().contains(UserRole.STUDENT_ALT) || targetEntity.getRoles().contains(UserRole.STUDENT_INIT))
                ){
                    teamEntity.getMembers().add(targetEntity);
                    return TeamMapper.toDTO(teamEntity);
                } else {
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.BAD_REQUEST);  
                }
            } else {
              throw new SAE5ManagementException(SAE5ManagementExceptionTypes.BAD_REQUEST);  
            }

        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
		
    }

    public ArrayList<TeamDTO> getFilteredTeams(Long id, String name, Long projectId, Long leaderId) {
        try {
            ArrayList<TeamEntity> teamEntities = teamRepository.getFilteredTeams(id, name, projectId, leaderId);
            ArrayList<TeamDTO> teamDTOs = new ArrayList<>();
            for (TeamEntity teamEntity : teamEntities) {
                teamDTOs.add(TeamMapper.toDTO(teamEntity));
            }
            return teamDTOs;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }
}
