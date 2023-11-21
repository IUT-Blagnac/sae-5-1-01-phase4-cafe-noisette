package fr.iut.blagnac.teams.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iut.blagnac.teams.dtos.TeamDTO;
import fr.iut.blagnac.teams.entities.TeamEntity;
import fr.iut.blagnac.teams.mappers.TeamMapper;
import fr.iut.blagnac.teams.repositories.TeamRepository;
import fr.iut.blagnac.users.dtos.UserDTO;
import fr.iut.blagnac.users.entities.PlayerInfoEntity;
import fr.iut.blagnac.users.entities.UserEntity;
import fr.iut.blagnac.users.mappers.PlayerInfoMapper;
import fr.iut.blagnac.users.mappers.UserMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class TeamService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TeamService.class);

    @Inject
    TeamRepository teamRepository;
    
    public TeamDTO getTeam(Long id) {
        try {
            TeamEntity teamEntity = teamRepository.findById(id);

            if (teamEntity == null) {
                LOGGER.error("User not found");
                return null;
            }

            TeamDTO teamDTO = TeamMapper.toDTO(teamEntity);

            return teamDTO;
        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw e;
        }
    }

    public TeamDTO getUserbyName(String name){
        try{
            TeamEntity teamEntity = teamRepository.findByName(name);

            if(teamEntity == null) {
                LOGGER.error("User not found");
                return null;
            }

            TeamDTO teamDTO = TeamMapper.toDTO(teamEntity);

            return teamDTO;
        } catch (PersistenceException e){
            LOGGER.error("Error while getting user", e);
            throw e;
        }
    }

    @Transactional
    public TeamDTO createTeam(TeamDTO teamDTO) {
        try {
            TeamEntity teamEntity = TeamMapper.toEntity(teamDTO);
            
            teamRepository.persist(teamEntity);
           
            return TeamMapper.toDTO(teamEntity);

        } catch (PersistenceException e) {
            LOGGER.error("Error while getting user", e);
            throw e;
        }
    }
}
