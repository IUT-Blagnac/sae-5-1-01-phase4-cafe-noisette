package fr.iut.blagnac.users.services;

import fr.iut.blagnac.authentication.dtos.AuthRequest;
import fr.iut.blagnac.authentication.utils.PBKDF2Encoder;
import fr.iut.blagnac.authentication.utils.PermissionChecker;
import fr.iut.blagnac.exceptions.SAE5ManagementException;
import fr.iut.blagnac.exceptions.SAE5ManagementExceptionTypes;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.entities.PlayerInfoEntity;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.mappers.PlayerInfoMapper;
import fr.iut.blagnac.users.mappers.UserMapper;
import fr.iut.blagnac.users.repositories.PlayerInfoRepository;
import fr.iut.blagnac.users.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.SecurityContext;
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

        return userDTO;
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
                throw new SAE5ManagementException(SAE5ManagementExceptionTypes.USER_NOT_FOUND);
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
