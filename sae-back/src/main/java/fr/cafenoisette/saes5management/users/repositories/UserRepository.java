package fr.cafenoisette.saes5management.users.repositories;

import java.util.List;

import fr.cafenoisette.saes5management.users.enums.UserRole;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepository<UserEntity> {

    public UserEntity findByUsername(String username) {
        return find("username", username).firstResult();
    }

    public UserEntity findByEmail(String email) {
        return find("email", email).firstResult();
    }

    public List<UserEntity> findByRole(UserRole role){
        return find("roles",role).list();
    }

    /**
     * Get all users or a user by id, username, firstname, lastname, email or team id, each parameter is optional and can be combined
     * @param id the id of the user
     * @param username the username of the user
     * @param firstname the firstname of the user
     * @param lastname the lastname of the user
     * @param email the email of the user
     * @param teamId the id of the team of the user
     * @return
     */
    public List<UserEntity> getFilteredUsers(Long id, String username, String firstname, String lastname, String email, Long teamId) {
        // get all users
        List<UserEntity> users = listAll();
        // if id is not null, remove all users that don't have this id
        if (id != null) {
            users.removeIf(user -> !user.getId().equals(id));
        }
        // if username is not null, remove all users that don't have this username
        if (username != null) {
            users.removeIf(user -> !user.getUsername().equals(username));
        }
        // if firstname is not null, remove all users that don't have this firstname
        if (firstname != null) {
            users.removeIf(user -> !user.getFirstname().equals(firstname));
        }
        // if lastname is not null, remove all users that don't have this lastname
        if (lastname != null) {
            users.removeIf(user -> !user.getLastname().equals(lastname));
        }
        // if email is not null, remove all users that don't have this email
        if (email != null) {
            users.removeIf(user -> !user.getEmail().equals(email));
        }
        // if teamId is not null, remove all users that don't have this team id
        if (teamId != null) {
            users.removeIf(user -> !user.getTeam().getId().equals(teamId));
        }
        // return the list of users
        return users;
    }
}