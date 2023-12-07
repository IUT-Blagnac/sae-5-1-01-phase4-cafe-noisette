package fr.iut.blagnac.users.repositories;

import java.util.ArrayList;
import java.util.List;

import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.enums.UserRole;
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

    public List<UserEntity> getFilteredUsers(Long id, String username, String firstname, String lastname, String email, Long teamId) {
        List<UserEntity> users = new ArrayList<>();
        if (id != null) {
            users.add(findById(id));
        } else if (username != null) {
            users.add(findByUsername(username));
        } else if (firstname != null) {
            users.add(find("firstname", firstname).firstResult());
        } else if (lastname != null) {
            users.add(find("lastname", lastname).firstResult());
        } else if (email != null) {
            users.add(findByEmail(email));
        } else if (teamId != null) {
            users.add(find("team_id", teamId).firstResult());
        }

        return users;
    }
}