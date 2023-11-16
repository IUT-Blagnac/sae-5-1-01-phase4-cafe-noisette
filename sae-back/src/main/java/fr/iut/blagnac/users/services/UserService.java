package fr.iut.blagnac.users.services;

import fr.iut.blagnac.users.dtos.UserDTO;
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
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Inject
    UserRepository userRepository;

    public UserDTO getUser(Long id) {
        try {
            UserEntity userEntity = userRepository.findById(id);

            if (userEntity == null) {
                LOGGER.error("User not found");
                return null;
            }

            UserDTO userDTO = UserMapper.toDTO(userEntity);

            return userDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw e;
        }
    }

    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        try {
            UserEntity userEntity = UserMapper.toEntity(userDTO);
            userRepository.persist(userEntity);
            return UserMapper.toDTO(userEntity);
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw e;
        }
    }

//    @Transactional
//    public UserDTO createUser(UserDTO userDTO) {
//        User userEntity = new User(userDTO.getUsername(), userDTO.getAge());
//        userRepository.persist(userEntity);
//
//    }

}