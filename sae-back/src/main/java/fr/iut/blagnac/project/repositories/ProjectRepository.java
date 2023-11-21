package fr.iut.blagnac.project.repositories;

import fr.iut.blagnac.project.entities.ProjectEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProjectRepository implements PanacheRepository<ProjectEntity> {
    public ProjectEntity findByName(String nom) {
        return find("nom", nom).firstResult();
    }
}
