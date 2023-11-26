package fr.iut.blagnac.project.services;

import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.exceptions.SAE5ManagementExceptionTypes;
import fr.iut.blagnac.project.dtos.ProjectDTO;
import fr.iut.blagnac.project.entities.ProjectEntity;
import fr.iut.blagnac.project.mappers.ProjectMapper;
import fr.iut.blagnac.project.repositories.ProjectRepository;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.mappers.UserMapper;
import fr.iut.blagnac.users.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
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
                return null;
            }

            ProjectDTO projectDTO = ProjectMapper.toDTO(projectEntity);

            return projectDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting project", e);
            throw e;
        }
    }

    public ProjectDTO getProjectByName(String name) {
        try {
            ProjectEntity projectEntity = projectRepository.findByName(name);

            if (projectEntity == null) {
                LOGGER.error("Project not found");
                return null;
            }

            ProjectDTO projectDTO = ProjectMapper.toDTO(projectEntity);

            return projectDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting project", e);
            throw e;
        }
    }

    @Transactional
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        try {
            ProjectEntity projectEntity = ProjectMapper.toEntity(projectDTO);
            UserEntity userEntity = userRepository.findById(projectDTO.getContactId());

            if(userEntity == null) {
                LOGGER.error("user not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
            }
            projectEntity.setContact(userEntity);
            LOGGER.error("added contact");

            projectRepository.persist(projectEntity);
            LOGGER.error("project persisted");
            return ProjectMapper.toDTO(projectEntity);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting project", e);
            throw e;
        }
    }
}
