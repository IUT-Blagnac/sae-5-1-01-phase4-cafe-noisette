package fr.iut.blagnac.teams.repositories;

import fr.iut.blagnac.teams.entities.TeamEntity;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.repositories.UserRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TeamRepository implements PanacheRepository<TeamEntity>  {

     public TeamEntity findByName(String Name) {
        return find("name", Name).firstResult();
    }

    public TeamEntity findByUser(UserEntity user) {
        return find("id", user.getTeam()).firstResult();


    }
    
}
