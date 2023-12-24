package fr.cafenoisette.saes5management.teams.repositories;

import fr.cafenoisette.saes5management.projects.entities.ProjectEntity;
import fr.cafenoisette.saes5management.teams.entities.TeamEntity;
import fr.cafenoisette.saes5management.users.entities.UserEntity;
import fr.cafenoisette.saes5management.users.repositories.UserRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;

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

    /**
     * Get all teams or a team by id, name, project id or leader id, each parameter is optional and can be combined
     * @param id id of the team
     * @param name name of the team
     * @param projectId id of the project
     * @param leaderId id of the leader
     * @return a list of teams
     */
    public ArrayList<TeamEntity> getFilteredTeams(Long id, String name, Long projectId, Long leaderId) {
        // get all teams
        ArrayList<TeamEntity> teams = new ArrayList<>(listAll());
        // if id is not null, remove all teams that don't have this id
        if (id != null) {
            teams.removeIf(team -> !team.getId().equals(id));
        }
        // if name is not null, remove all teams that don't have this name
        if (name != null) {
            teams.removeIf(team -> !team.getName().equals(name));
        }
        // if projectId is not null, remove all teams that don't have this project id
        if (projectId != null) {
            teams.removeIf(team -> !team.getProject().getId().equals(projectId));
        }
        // if leaderId is not null, remove all teams that don't have this leader id
        if (leaderId != null) {
            teams.removeIf(team -> !team.getLeader().getId().equals(leaderId));
        }
        // return the list of teams

        return teams;
    }

    public List<ProjectEntity> getPreferences(Long teamId) {
        TeamEntity teamEntity = findById(teamId);
        return teamEntity.getPreferences();
    }
}
