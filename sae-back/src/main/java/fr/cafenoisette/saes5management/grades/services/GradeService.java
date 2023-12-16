package fr.cafenoisette.saes5management.grades.services;

import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.exceptions.SAE5ManagementExceptionTypes;
import fr.cafenoisette.saes5management.grades.dtos.GradeDTO;
import fr.cafenoisette.saes5management.grades.entities.GradeEntity;
import fr.cafenoisette.saes5management.grades.enums.GradeType;
import fr.cafenoisette.saes5management.grades.mappers.GradeMapper;
import fr.cafenoisette.saes5management.grades.repositories.GradeRepository;
import fr.cafenoisette.saes5management.teams.entities.TeamEntity;
import fr.cafenoisette.saes5management.teams.repositories.TeamRepository;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import fr.cafenoisette.saes5management.users.repositories.UserRepository;
import jakarta.ws.rs.core.SecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

import java.util.ArrayList;

import static fr.cafenoisette.saes5management.users.enums.UserRole.*;


@ApplicationScoped
public class GradeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GradeService.class);

    @Inject
    GradeRepository gradeRepository;

    @Inject
    UserRepository userRepository;

    @Inject
    TeamRepository teamRepository;


    public GradeDTO getGrade(Long id, SecurityContext securityContext) {
        try {
            GradeEntity gradeEntity = gradeRepository.findById(id);

            if (gradeEntity == null) {
                LOGGER.error("Grade not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.GRADE_NOT_FOUND);
            }

            GradeDTO gradeDTO = GradeMapper.toDTO(gradeEntity);

            return gradeDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting grade", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public GradeDTO createGrade(GradeDTO gradeDTO, SecurityContext securityContext) {
        try {
            GradeEntity gradeEntity = GradeMapper.toEntity(gradeDTO);
            UserEntity requestUser = userRepository.findByUsername(securityContext.getUserPrincipal().getName());

            if(requestUser.getRoles().contains(TEACHER) ||
                    requestUser.getRoles().contains(CLIENT)||
                    requestUser.getRoles().contains(ADMIN)) {

                TeamEntity teamEntity = null;
                if(gradeDTO.getTeamId() != null) {
                    teamEntity = teamRepository.findById(gradeDTO.getTeamId());
                }

                if(teamEntity == null) {
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.TEAM_NOT_FOUND);
                }

                gradeEntity.setTeam(teamEntity);
                gradeRepository.persist(gradeEntity);
            } else {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
            }
            return GradeMapper.toDTO(gradeEntity);

        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public GradeDTO updateGrade(Long gradeId, GradeDTO gradeDTO, SecurityContext securityContext) {
        try {
            GradeEntity gradeEntity = gradeRepository.findById(gradeId);

            if(gradeEntity == null) {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.GRADE_NOT_FOUND);
            }

            UserEntity requestUser = userRepository.findByUsername(securityContext.getUserPrincipal().getName());

            if(requestUser.getRoles().contains(TEACHER) ||
                requestUser.getRoles().contains(CLIENT) ||
                requestUser.getRoles().contains(ADMIN)) {

                if(gradeDTO.getTitle() != null) {
                    gradeEntity.setTitle(gradeDTO.getTitle());
                }

                if(gradeDTO.getDescription() != null) {
                    gradeEntity.setDescription(gradeDTO.getDescription());
                }

                if(gradeDTO.getGrade() != null) {
                    gradeEntity.setGrade(gradeDTO.getGrade());
                }

                if(gradeDTO.getCoefficient() != null) {
                    gradeEntity.setCoefficient(gradeDTO.getCoefficient());
                }

                if(gradeDTO.getType() != null) {
                    gradeEntity.setType(gradeDTO.getType());
                }

                if(gradeDTO.getTeamId() != null) {
                    TeamEntity teamEntity = teamRepository.findById(gradeDTO.getTeamId());

                    gradeEntity.setTeam(teamEntity);
                }

                gradeRepository.persist(gradeEntity);
            } else {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
            }
            return GradeMapper.toDTO(gradeEntity);

        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public void deleteGrade(Long gradeId, SecurityContext securityContext) {
        try {
            GradeEntity gradeEntity = gradeRepository.findById(gradeId);

            if(gradeEntity == null) {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.GRADE_NOT_FOUND);
            }

            UserEntity requestUser = userRepository.findByUsername(securityContext.getUserPrincipal().getName());

            if(requestUser.getRoles().contains(TEACHER) ||
                    requestUser.getRoles().contains(CLIENT) ||
                    requestUser.getRoles().contains(ADMIN)) {

                gradeRepository.delete(gradeEntity);
            } else {
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
            }
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public ArrayList<GradeDTO> getFilteredGrades(Long id, String title, String description, Long grade, Long coeff, GradeType type, Long teamId) {
        ArrayList<GradeEntity> gradeEntities = gradeRepository.getFilteredGrades(id, title, description, grade, coeff, type, teamId);
        ArrayList<GradeDTO> gradeDTOS = new ArrayList<>();
        for(GradeEntity gradeEntity : gradeEntities) {
            gradeDTOS.add(GradeMapper.toDTO(gradeEntity));
        }

        return  gradeDTOS;
    }
}
