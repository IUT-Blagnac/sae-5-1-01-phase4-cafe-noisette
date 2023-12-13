package fr.cafenoisette.saes5management.teams.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.exceptions.SAE5ManagementExceptionTypes;
import fr.cafenoisette.saes5management.teams.dtos.TeamDTO;
import fr.cafenoisette.saes5management.teams.entities.TeamEntity;
import fr.cafenoisette.saes5management.teams.mappers.TeamMapper;
import fr.cafenoisette.saes5management.teams.repositories.TeamRepository;
import jakarta.ws.rs.core.SecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.cafenoisette.saes5management.projects.entities.ProjectEntity;
import fr.cafenoisette.saes5management.projects.repositories.ProjectRepository;
import fr.cafenoisette.saes5management.users.dtos.UserDTO;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import fr.cafenoisette.saes5management.users.enums.UserRole;
import fr.cafenoisette.saes5management.users.repositories.UserRepository;
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

            teamRepository.persist(teamEntity);

            Set<UserEntity> teamMembersEntities = new HashSet<>();
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

            LOGGER.info("checking if user exists");
            if (userEntity == null) {
                LOGGER.error("User not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
            }

            LOGGER.info("checking if user is the leader");
            if (
                    securityContext.isUserInRole("ADMIN") ||
                            userEntity.getTeam().getId().equals(teamId) &&
                                    userEntity.getTeam().getLeader().getId().equals(userEntity.getId())
            ) {
                TeamEntity teamEntity = userEntity.getTeam();
                UserEntity targetEntity;

                LOGGER.info("checking if target user id or username is not null");
                if (userDTO.getId() != null) {
                    targetEntity = userRepository.findById(userDTO.getId());
                } else if (userDTO.getUsername() != null) {
                    targetEntity = userRepository.findByUsername(userDTO.getUsername());
                } else {
                    LOGGER.error("UserDTO does not contain id or username");
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.BAD_REQUEST);
                }

                LOGGER.info("checking if target user entity is not null");
                if (targetEntity == null) {
                    LOGGER.error("Target user entity not found");
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
                }

                LOGGER.info("checking if target user entity has already a team");
                if (targetEntity.getTeam() != null) {
                    LOGGER.error("User has already a team");
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.ALREADY_IN_TEAM);
                }

                LOGGER.info("checking if target user entity is a student");
                if (targetEntity.getRoles().contains(UserRole.STUDENT_ALT) || targetEntity.getRoles().contains(UserRole.STUDENT_INIT)) {
                    LOGGER.info("Adding " + targetEntity.getUsername() + " (" + targetEntity.getId() + ") to team " + teamEntity.getId());
                    teamEntity.getMembers().add(targetEntity);
                    targetEntity.setTeam(teamEntity);
                    return TeamMapper.toDTO(teamEntity);
                } else {
                    LOGGER.error("target user is not a student");
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
                }
            } else {
                LOGGER.error("User is not the leader");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
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

    @Transactional
    public TeamDTO setPreferences(Long teamId, List<Long> projectIds, SecurityContext securityContext) {
        try {
            UserEntity userEntity = userRepository.findByUsername(securityContext.getUserPrincipal().getName());

            if (userEntity == null) {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
            }

            if (
                    securityContext.isUserInRole("ADMIN") ||
                            userEntity.getTeam().getId().equals(teamId) && userEntity.getTeam().getLeader().getId().equals(userEntity.getId())
            ) {
                TeamEntity teamEntity = teamRepository.findById(teamId);
                teamEntity.setPreferences(new ArrayList<>());

                for(Long id: projectIds) {
                    ProjectEntity projectEntity = projectRepository.findById(id);
                    teamEntity.getPreferences().add(projectEntity);
                }

                return TeamMapper.toDTO(teamEntity);

            } else {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
            }

        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public TeamDTO addProject(Long teamId, Long projectId, SecurityContext securityContext) {
        try {
            UserEntity userEntity = userRepository.findByUsername(securityContext.getUserPrincipal().getName());

            if (userEntity == null) {
                LOGGER.error("User not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
            }

            TeamEntity teamEntity = teamRepository.findById(teamId);

            ProjectEntity projectEntity = projectRepository.findById(projectId);
            teamEntity.setProject(projectEntity);

            return TeamMapper.toDTO(teamEntity);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public void removeProject(Long teamId, SecurityContext securityContext) {
        try {
            UserEntity userEntity = userRepository.findByUsername(securityContext.getUserPrincipal().getName());

            if (userEntity == null) {
                LOGGER.error("User not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
            }

            TeamEntity teamEntity = teamRepository.findById(teamId);
            teamEntity.setProject(null);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }
}
