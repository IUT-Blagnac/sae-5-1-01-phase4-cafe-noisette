package fr.iut.blagnac.users.services;

import fr.iut.blagnac.authentication.dtos.AuthRequest;
import fr.iut.blagnac.authentication.utils.PBKDF2Encoder;
import fr.iut.blagnac.authentication.utils.PermissionChecker;
import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.exceptions.SAE5ManagementExceptionTypes;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.dtos.subdtos.ClientUserDTO;
import fr.iut.blagnac.users.dtos.subdtos.StudentUserDTO;
import fr.iut.blagnac.users.entities.PlayerInfoEntity;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.enums.UserRole;
import fr.iut.blagnac.users.mappers.PlayerInfoMapper;
import fr.iut.blagnac.users.mappers.UserMapper;
import fr.iut.blagnac.users.repositories.PlayerInfoRepository;
import fr.iut.blagnac.users.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.SecurityContext;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ApplicationScoped
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Inject
    PBKDF2Encoder passwordEncoder;

    @Inject
    UserRepository userRepository;

    @Inject
    PlayerInfoRepository playerInfoRepository;

    public UserDTO getUserById(Long id, SecurityContext securityContext) {
        try {
            UserEntity userEntity = userRepository.findById(id);

            return getUser(securityContext, userEntity);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public UserDTO getUserByUsername(String username, SecurityContext securityContext) {
        try {
            UserEntity userEntity = userRepository.findByUsername(username);

            return getUser(securityContext, userEntity);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    private UserDTO getUser(SecurityContext securityContext, UserEntity userEntity) {
        if (userEntity == null) {
            LOGGER.error("User not found");
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
        }

        if (!PermissionChecker.checkUsername(securityContext, userEntity.getUsername(), true)) {
            LOGGER.error("User not authorized");
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_AUTHORIZED);
        }

        UserDTO userDTO = UserMapper.toDTO(userEntity);
        LOGGER.info("User " + userEntity.getUsername() + " found");

        return userDTO;
    }

    public List<UserDTO> getUsersByRole(UserRole role){
        try {
            List<UserEntity> userList = userRepository.findByRole(role);
            List<UserDTO> userDTOList = new ArrayList<>();

            for (UserEntity userEntity : userList){
                userDTOList.add(UserMapper.toDTO(userEntity));
            }

            return userDTOList;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting users with role", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public List<StudentUserDTO> getStudents(
            Long id,
            String username,
            String firstname,
            String lastname,
            Long teamId
    ) {
        try {
            List<UserEntity> users = userRepository.getFilteredUsers(id, username, firstname, lastname, null, teamId);
            List<StudentUserDTO> studentUserDTOList = new ArrayList<>();

            for (UserEntity userEntity : users) {
                if (userEntity.getRoles().contains(UserRole.STUDENT_INIT) || userEntity.getRoles().contains(UserRole.STUDENT_ALT)) {
                    studentUserDTOList.add(UserMapper.toStudentDTO(userEntity));
                }
            }

            return studentUserDTOList;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting students", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public List<ClientUserDTO> getClients(
            Long id,
            String username,
            String firstname,
            String lastname,
            String email
    ) {
        try {
            List<UserEntity> users = userRepository.getFilteredUsers(id, username, firstname, lastname, email, null);

            List<ClientUserDTO> clientUserDTOList = new ArrayList<>();

            for (UserEntity userEntity : users) {
                if (userEntity.getRoles().contains(UserRole.CLIENT)) {
                    clientUserDTOList.add(UserMapper.toClientDTO(userEntity));
                }
            }

            return clientUserDTOList;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting clients", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        try {
            if (userRepository.findByUsername(userDTO.getUsername()) != null ||
                    userRepository.findByEmail(userDTO.getEmail()) != null) {
                LOGGER.error("User already exists");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_ALREADY_EXISTS);
            }

            UserEntity userEntity = UserMapper.toEntity(userDTO);
            PlayerInfoEntity playerInfoEntity = PlayerInfoMapper.toEntity(userDTO.getPlayerInfo());

            playerInfoRepository.persist(playerInfoEntity);

            userEntity.setPlayerInfo(playerInfoEntity);

            userRepository.persist(userEntity);
            LOGGER.info("User " + userEntity.getUsername() + " created");
            return UserMapper.toDTO(userEntity);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

    public UserDTO checkPassword(AuthRequest authRequest) {
        try {
            UserEntity userEntity = userRepository.findByUsername(authRequest.getUsername());

            if (userEntity == null) {
                LOGGER.error("User not found");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_DOES_NOT_EXIST);
            }

            if (userEntity.getPassword().equals(passwordEncoder.encode(authRequest.getPassword()))) {
                return UserMapper.toDTO(userEntity);
            } else {
                LOGGER.error("Wrong password");
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.WRONG_PASSWORD);
            }
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw new SAE5ManagementException(SAE5ManagementExceptionTypes.PERSISTENCE_ERROR, e);
        }
    }

}
