package fr.cafenoisette.saes5management.projects.services;

import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.exceptions.SAE5ManagementExceptionTypes;
import fr.cafenoisette.saes5management.projects.dtos.ProjectDTO;
import fr.cafenoisette.saes5management.projects.mappers.ProjectMapper;
import fr.cafenoisette.saes5management.projects.entities.ProjectEntity;
import fr.cafenoisette.saes5management.projects.repositories.ProjectRepository;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import fr.cafenoisette.saes5management.users.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

import java.util.*;

import jakarta.ws.rs.core.SecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ApplicationScoped
public class ProjectService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProjectService.class);

    @Inject
    ProjectRepository projectRepository;

    @Inject
    UserRepository userRepository;

    public ProjectDTO getProject(Long id) {
        try {
            ProjectEntity projectEntity = projectRepository.findById(id);

            if (projectEntity == null) {
                LOGGER.error("Project not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PROJECT_NOT_FOUND);
            }

            ProjectDTO projectDTO = ProjectMapper.toDTO(projectEntity);

            return projectDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting project", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public ProjectDTO getProjectByName(String name) {
        try {
            ProjectEntity projectEntity = projectRepository.findByName(name);

            if (projectEntity == null) {
                LOGGER.error("Project not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PROJECT_NOT_FOUND);
            }

            ProjectDTO projectDTO = ProjectMapper.toDTO(projectEntity);

            return projectDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting project", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public ArrayList <ProjectDTO> getProjects() {
        try {
            List<ProjectEntity> projectEntities = projectRepository.findAll().stream().toList();

            ArrayList<ProjectDTO> projectDTOs = new ArrayList<>();
            for(ProjectEntity projectEntity : projectEntities) {
                projectDTOs.add(ProjectMapper.toDTO(projectEntity));
            }

            return projectDTOs;

        } catch (PersistenceException e) {
            LOGGER.error("Error while getting projects", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public ProjectDTO createProject(ProjectDTO projectDTO, SecurityContext securityContext) {
        try {
            ProjectEntity projectEntity = ProjectMapper.toEntity(projectDTO);
            Set<Long> idList = projectDTO.getClientIds();
            Set<UserEntity> userList = new LinkedHashSet<>();
            for(Long id : idList) {
                UserEntity userEntity = userRepository.findById(id);

                if(userEntity == null) {
                    LOGGER.error("user not found");
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
                }

                userList.add(userEntity);
            }

            projectEntity.setClients(userList);
            LOGGER.error("added client");

            projectRepository.persist(projectEntity);
            LOGGER.error("project persisted");
            return ProjectMapper.toDTO(projectEntity);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting project", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public ProjectDTO updateProject(ProjectDTO changedProject, SecurityContext securityContext) {
        try {

            ProjectEntity oldProject = projectRepository.findById(changedProject.getId());
            if(oldProject == null) {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PROJECT_NOT_FOUND);
            }
            if(securityContext.isUserInRole("ADMIN")) {
                ProjectEntity updateProject = ProjectMapper.toEntity(changedProject);

                if (changedProject.getClientIds() != null) {
                    Set<Long> idList = changedProject.getClientIds();
                    Set<UserEntity> userList = new LinkedHashSet<>();
                    for (Long id : idList) {
                        UserEntity userEntity = userRepository.findById(id);

                        if (userEntity == null) {
                            LOGGER.error("user not found");
                            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
                        }

                        userList.add(userEntity);
                    }

                    oldProject.setClients(userList);
                }

                if (updateProject.getName() != null) {
                    oldProject.setName(updateProject.getName());
                }

                if (updateProject.getDescription() != null) {
                    oldProject.setDescription(updateProject.getDescription());
                }

                projectRepository.persist(oldProject);
                LOGGER.error("project persisted");
                return ProjectMapper.toDTO(oldProject);
            }
            else {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.BAD_REQUEST);
            }
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting project", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }
}
