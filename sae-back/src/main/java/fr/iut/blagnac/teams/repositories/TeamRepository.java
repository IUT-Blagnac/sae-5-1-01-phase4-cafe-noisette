package fr.iut.blagnac.teams.repositories;

import fr.iut.blagnac.teams.entities.TeamEntity;
import fr.iut.blagnac.users.entities.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TeamRepository implements PanacheRepository<TeamEntity>  {

     public TeamEntity findByName(String Name) {
        return find("name", Name).firstResult();
    }
    
}
