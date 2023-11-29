package fr.iut.blagnac.projects.services;

import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.exceptions.SAE5ManagementExceptionTypes;
import fr.iut.blagnac.projects.dtos.ProjectDTO;
import fr.iut.blagnac.projects.entities.ProjectEntity;
import fr.iut.blagnac.projects.mappers.ProjectMapper;
import fr.iut.blagnac.projects.repositories.ProjectRepository;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Collection;
import java.util.ArrayList;

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

    public ProjectDTO[] getProjects(){
         try {
            List<ProjectEntity> projectList = projectRepository.get();
            ProjectEntity[] projectEntity = new ProjectEntity[projectList.size()];
            projectList.toArray(projectEntity);

            ProjectDTO[] listProjectDTO = new ProjectDTO[projectList.size()];
            int id = 0;

            for (ProjectEntity projectEntity2 : projectEntity) {
            
                ProjectDTO projectDTO = ProjectMapper.toDTO(projectEntity2);
                listProjectDTO[id] = projectDTO;

                id+=1;
            }
            
            return listProjectDTO;
            

            } catch (PersistenceException e) {
                LOGGER.error("Error while getting projects", e);
                throw e;
            }
    }

    @Transactional
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        try {
            ProjectEntity projectEntity = ProjectMapper.toEntity(projectDTO);
            Collection<Long> idList = projectDTO.getContactIds();
            Collection<UserEntity> userList = new ArrayList<UserEntity>();
            for(Long id : idList) {
                UserEntity userEntity = userRepository.findById(id);

                if(userEntity == null) {
                    LOGGER.error("user not found");
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
                }

                userList.add(userEntity);
            }

            projectEntity.setContacts(userList);
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
