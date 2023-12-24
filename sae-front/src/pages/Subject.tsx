import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuthUser } from '../contexts/AuthUserContext';
import { addMemberTeam, addProjectTeam, deleteProjectTeam, getAllTeams, getProjects } from '../rest/queries';
import { Team } from '../models/Team';
import { Project } from '../models/Project';
import { useTheme } from '../utils/theme';
import toast from 'react-hot-toast';
import { Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RotateLeftIcon from '@mui/icons-material/RotateLeft'; // Ajout de l'import RotateLeftIcon

interface SubjectProps {}

export interface ExtendedTeam extends Omit<Team, 'projectId'> {
  id?: number;
  projectId?: number | undefined;
}

const Subject: React.FC<SubjectProps> = () => {
  const [teams, setTeams] = useState<ExtendedTeam[]>([]);
  const [tasks, setTasks] = useState<{ id: number; title: string; status: string; teamIds?: number[] }[]>([]);
  const [showResetButton, setShowResetButton] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    requestTeams();
  }, []);

  const requestTeams = () => {
    getAllTeams().then((response) => {
      if (response.responseCode === 200 && response.data) {
        setTeams(response.data);
        requestProjects(response.data);
      } else {
        console.log(response.data);
      }
    });
  };

  const requestProjects = (listTeams: ExtendedTeam[]) => {
    getProjects().then((response) => {
      if (response.responseCode === 200 && response.data) {
        setTasks(
          response.data.map((project) => {
            const teamIds = listTeams
              .filter((team) => team.projectId === project.id)
              .map((team) => team.id as number);

            return {
              id: project.id || 0,
              title: project.name,
              status: 'undefined',
              ...(teamIds.length > 0 && { teamIds }),
            };
          })
        );
      } else {
        console.log(response.data);
      }
    });
  };

  const updateTasksWithTeamIds = () => {
    const teamsWithProject = teams.filter((team) => team.projectId !== null && team.projectId !== undefined);
    console.log(teamsWithProject);

    const updatedTasks = tasks.map((task) => {
      console.log(task);
      teamsWithProject.forEach((team) => {
        if (team.projectId === task.id) {
          const teamIds = task.teamIds || [];
          task.teamIds = [...teamIds, team.id as number];
        }
      });
      return task;
    });

    setTasks(updatedTasks);
    console.log('updated task', updatedTasks);
  };

  const handleDrop = (teamId: number, projectId: number) => {
    const team = teams.find((team) => team.id === teamId);

    if (team && team.projectId !== null && team.projectId !== undefined) {
      toast.error("Cette équipe est déjà affectée à un projet");
      return;
    }

    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, projectId } : team
    );
    setTeams(updatedTeams);

    const updatedTasks = tasks.map((task) => {
      if (task.id === projectId) {
        const teamIds = task.teamIds || [];
        return { ...task, teamIds: [...teamIds, teamId] };
      }
      return task;
    });
    setTasks(updatedTasks);

    console.log(`Team ${teamId} dropped on Project ${projectId}`);
    console.log(`Team ${teamId} is now in Project ${projectId}`);
  };

  const handleReset = async () => {
    try {
      // Remove team associations from projects
      await Promise.all(
        teams.map(async (team) => {
          if (team.projectId !== undefined) {
            const teamForDelete = team as Team;
            await deleteProjectTeam(teamForDelete, team.id ?? 0);
          }
        })
      );

      // Fetch updated teams
      const updatedTeamsResponse = await getAllTeams();

      if (updatedTeamsResponse.responseCode === 200 && updatedTeamsResponse.data) {
        // Set projectId to undefined for all teams
        const resetTeams = updatedTeamsResponse.data.map((team) => ({
          ...team,
          projectId: undefined as number | undefined,
        }));
        setTeams(resetTeams);
      } else {
        console.log(updatedTeamsResponse.data);
      }

      // Reset teamIds for all tasks
      const resetTasks = tasks.map((task) => ({ ...task, teamIds: [] }));
      setTasks(resetTasks);

      toast.success("Les modifications ont été réinitialisées");
    } catch (error) {
      console.error("Error while resetting:", error);
      toast.error("Une erreur est survenue lors de la réinitialisation des modifications");
    }
  };

  const handleSave = async () => {
    try {
      console.log("Saving changes...");

      await Promise.all(
        tasks
          .filter((task) => task.teamIds)
          .flatMap((task) =>
            task.teamIds?.map((teamId) => {
              const team = teams.find((team) => team.id === teamId) as Team;
              console.log("Saving project for team:", team);
              return addProjectTeam(team, teamId);
            }) || []
          )
      );

      console.log("Changes saved successfully");

      const updatedTeams = await getAllTeams();
      setTeams(updatedTeams.data || []);

      toast.success("Les modifications ont été sauvegardées");
    } catch (error) {
      console.error("Error while saving changes:", error);
      toast.error("Une erreur est survenue lors de la sauvegarde des modifications");
    }
  };

  const TeamItem: React.FC<{ team: ExtendedTeam }> = ({ team }) => {
    const [, drag] = useDrag({
      type: "TEAM",
      item: { id: team.id || 0 },
    });

    const teamItemStyle: React.CSSProperties = {
      backgroundColor: theme.palette.secondary.main,
      border: "1px solid black",
      marginBottom: "5px",
      padding: "8px",
    };

    return <div ref={drag} style={teamItemStyle}>{team.name}</div>;
  };

  const ProjectItem: React.FC<{ task: { id: number; title: string; status: string; teamIds?: number[] } }> = ({ task }) => {
    const [, drop] = useDrop({
      accept: "TEAM",
      drop: (item: { type: string; id: number }) => handleDrop(item.id, task.id),
    });

    const projectItemStyle: React.CSSProperties = {
      backgroundColor: theme.palette.secondary.main,
      border: "1px solid black",
      marginBottom: "5px",
      padding: "8px",
      color: "inherit",
    };

    return (
      <div ref={drop} style={projectItemStyle}>
        <div>
          <strong>{task.title}</strong>
        </div>
        {task.teamIds && task.teamIds.length > 0 && (
          <div>
            <strong>Teams:</strong>
            <ul>
              {task.teamIds.map((teamId) => (
                <li key={teamId}>{teams.find((team) => team.id === teamId)?.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const subjectContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  };

  const teamListStyle: React.CSSProperties = {
    width: "30%",
    padding: "10px",
    textAlign: "center",
    border: "3px solid black",
    marginTop: "1.4%",
    marginLeft: "5%",
  };

  const projectListStyle: React.CSSProperties = {
    width: "30%",
    padding: "10px",
    textAlign: "center",
    border: "3px solid purple",
    marginTop: "1.4%",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "20%",
    padding: "20px",
    marginRight: "2%",
  };

  const buttonStyle: React.CSSProperties = {
    color: "inherit",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px",
    textAlign: "center",
    width: "100%",
    display: "flex",
    alignItems: "center",  
    justifyContent: "center",  
    gap: "8px"
    
  };

  const teamsWithProject = teams.filter((team) => team.projectId !== null && team.projectId !== undefined);
  const teamsWithoutProject = teams.filter((team) => team.projectId === null || team.projectId === undefined);

  const tableHeaderStyle: React.CSSProperties = {
    border: "1px solid #dddddd",
    padding: "8px",
    textAlign: "center",
  };

  const tableCellStyle: React.CSSProperties = {
    border: "1px solid #dddddd",
    padding: "8px",
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h1>
        <center>Glisser les équipes dans le projet de votre choix</center>
      </h1>
      <div style={subjectContainerStyle}>
        <div style={teamListStyle}>
          <h2>Teams</h2>
          {teams.filter((team) => team.projectId === null || team.projectId === undefined).map((team) => (
            <TeamItem key={team.id} team={team} />
          ))}
          {teams.filter((team) => {
            const teamIsAssociated = tasks.some((task) => task.teamIds && task.teamIds.includes(team.id as number));
            return !teamIsAssociated;
          }).length === 0 && (
            <Box>Toutes les teams sont affectées à un projet</Box>
          )}
        </div>
        <div style={projectListStyle}>
          <h2>Projects</h2>
          {tasks.map((task) => {
            return <ProjectItem key={task.id} task={task} />;
          })}
        </div>
        <div style={buttonContainerStyle}>
          {showResetButton && (
            <div onClick={handleReset} style={buttonStyle}>
              <RotateLeftIcon />  Reset Teams
            </div>
          )}
          {showSaveButton && (
            <div onClick={handleSave} style={buttonStyle}>
              <SaveIcon />  Save Changes
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Subject;
