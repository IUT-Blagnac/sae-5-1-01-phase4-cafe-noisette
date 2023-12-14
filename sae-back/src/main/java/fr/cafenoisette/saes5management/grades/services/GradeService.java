package fr.cafenoisette.saes5management.grades.services;

import fr.cafenoisette.saes5management.exceptions.SAE5ManagementException;
import fr.cafenoisette.saes5management.exceptions.SAE5ManagementExceptionTypes;
import fr.cafenoisette.saes5management.grades.dtos.GradeDTO;
import fr.cafenoisette.saes5management.grades.entities.GradeEntity;
import fr.cafenoisette.saes5management.grades.mappers.GradeMapper;
import fr.cafenoisette.saes5management.grades.repositories.GradeRepository;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import fr.cafenoisette.saes5management.users.enums.UserRole;
import fr.cafenoisette.saes5management.users.repositories.UserRepository;
import jakarta.ws.rs.core.SecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

import static fr.cafenoisette.saes5management.users.enums.UserRole.*;


@ApplicationScoped
public class GradeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GradeService.class);

    @Inject
    GradeRepository gradeRepository;

    @Inject
    UserRepository userRepository;


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

                UserEntity userEntity = null;
                if(gradeDTO.getStudentId() != null) {
                    userEntity = userRepository.findById(gradeDTO.getStudentId());
                }

                if(userEntity == null) {
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
                }
                if(!userEntity.getRoles().contains(UserRole.STUDENT_INIT) &&
                        !userEntity.getRoles().contains(UserRole.STUDENT_ALT)) {
                    throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
                }

                gradeEntity.setStudent(userEntity);
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

                if(gradeDTO.getStudentId() != null) {
                    UserEntity userEntity = userRepository.findById(gradeDTO.getStudentId());

                    if(!userEntity.getRoles().contains(UserRole.STUDENT_INIT) &&
                            !userEntity.getRoles().contains(UserRole.STUDENT_ALT)) {
                        throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
                    }

                    gradeEntity.setStudent(userEntity);
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
}
