package fr.iut.blagnac.projects.repositories;

import java.util.List;

import fr.iut.blagnac.projects.entities.ProjectEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProjectRepository implements PanacheRepository<ProjectEntity> {
    public ProjectEntity findByName(String nom) {
        return find("nom", nom).firstResult();
    }

    public List<ProjectEntity> get(){
        return findAll().list();

    }
}
