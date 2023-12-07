package fr.cafenoisette.saes5management.teams.repositories;

import fr.cafenoisette.saes5management.teams.entities.TeamEntity;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import fr.cafenoisette.saes5management.users.repositories.UserRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;

@ApplicationScoped
public class TeamRepository implements PanacheRepository<TeamEntity>  {

    @Inject
    UserRepository userRepository;

    public TeamEntity findByName(String Name) {
        return find("name", Name).firstResult();
    }

    public TeamEntity findByUser(UserEntity user) {
        return find("id", user.getTeam()).firstResult();
    }

    public ArrayList<TeamEntity> getFilteredTeams(Long id, String name, Long projectId, Long leaderId) {
        ArrayList<TeamEntity> teams = new ArrayList<>();
        if (id != null) {
            teams.add(findById(id));
        } else if (name != null) {
            teams.add(findByName(name));
        } else if (projectId != null) {
            teams.add(find("project_id", projectId).firstResult());
        } else if (leaderId != null) {
            teams.add(find("leader_id", leaderId).firstResult());
        } else {
            teams.addAll(listAll());
        }
        return teams;
    }
}
