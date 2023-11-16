package fr.iut.blagnac.users.repositories;

import jakarta.enterprise.context.ApplicationScoped;
import fr.iut.blagnac.users.entities.PlayerInfoEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class PlayerInfoRepository implements PanacheRepository<PlayerInfoEntity>{
    
}
