package fr.cafenoisette.saes5management.users.repositories;

import jakarta.enterprise.context.ApplicationScoped;
import fr.cafenoisette.saes5management.users.entities.PlayerInfoEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class PlayerInfoRepository implements PanacheRepository<PlayerInfoEntity>{
    
}
