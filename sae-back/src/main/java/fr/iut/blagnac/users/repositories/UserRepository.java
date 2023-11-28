package fr.iut.blagnac.users.repositories;

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

}