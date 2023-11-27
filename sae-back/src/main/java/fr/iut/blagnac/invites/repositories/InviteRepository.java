package fr.iut.blagnac.invites.repositories;

import fr.iut.blagnac.users.entities.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class InviteRepository implements PanacheRepository<UserEntity> {

    public UserEntity findByUsername(String username) {
        return find("username", username).firstResult();
    }

    public UserEntity findByEmail(String email) {
        return find("email", email).firstResult();
    }

}