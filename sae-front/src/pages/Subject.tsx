import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuthUser } from '../contexts/AuthUserContext';
import { addMemberTeam, addProjectTeam, deleteProjectTeam, getAllTeams, getProjects } from '../rest/queries';
import { Team } from '../models/Team';
import { Project } from '../models/Project';
import { useTheme } from '../utils/theme';
import toast from 'react-hot-toast';
import { inherits } from 'util';

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
    getAllTeams().then((response) => {
      if (response.responseCode === 200 && response.data) {
        setTeams(response.data);
      } else {
        console.log(response.data);
      }
    });
  }, []);

  useEffect(() => {
    getProjects().then((response) => {
      if (response.responseCode === 200 && response.data) {
        setTasks(
          response.data.map((project) => ({
            id: project.id || 0,
            title: project.name,
            status: 'undefined',
          }))
        );
      } else {
        console.log(response.data);
      }
    });
  }, []);

  const handleDrop = (teamId: number, projectId: number) => {
    const team = teams.find((team) => team.id === teamId);
  
    if (team && team.projectId !== null && team.projectId !== undefined) {
      toast.error('Cette équipe est déjà affectée à un projet');
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

  const handleReset = () => {
    teams.forEach((team) => {
      if (team.projectId !== undefined) {
        const teamForDelete = team as Team; 
        console.log(teamForDelete)
        deleteProjectTeam(teamForDelete, team.id ?? 0).then((response) => {
          if (response.responseCode === 200) {
            if (response.data) {
              toast.success('Les modifications ont été réinitialisées');
            }
          } else {
            console.log('Error while removing project from team: ' + response.errorMessage);
          }
        });
      }
    });

    const resetTeams = teams.map((team) => ({ ...team, projectId: undefined as number | undefined }));
    setTeams(resetTeams);

    const resetTasks = tasks.map((task) => ({ ...task, teamIds: [] }));
    setTasks(resetTasks);

  };

  

  const handleSave = async () => {
    try {
      console.log('Saving changes...');
      
      // Save changes to the server
      await Promise.all(
        tasks
          .filter((task) => task.teamIds)
          .flatMap((task) =>
            task.teamIds?.map((teamId) => {
              const team = teams.find((team) => team.id === teamId) as Team;
              console.log('Saving project for team:', team);
              return addProjectTeam(team, teamId);
            }) || []
          )
      );
  
      console.log('Changes saved successfully');
  
      // Update local state to reflect the changes
      const updatedTeams = await getAllTeams();
      setTeams(updatedTeams.data || []);
  
      const resetTasks = tasks.map((task) => ({
        ...task,
        teamIds: [],
      }));
      setTasks(resetTasks);
  
      console.log('Reset tasks:', resetTasks);
  

  
      toast.success('Les modifications ont été sauvegardées');
    } catch (error) {
      console.error('Error while saving changes:', error);
      toast.error('Une erreur est survenue lors de la sauvegarde des modifications');
    }
  };

  const TeamItem: React.FC<{ team: ExtendedTeam }> = ({ team }) => {
    const [, drag] = useDrag({
      type: 'TEAM',
      item: { id: team.id || 0 },
    });

    const teamItemStyle: React.CSSProperties = {
      backgroundColor: theme.palette.secondary.main,
      border: '1px solid black',
      marginBottom: '5px',
      padding: '8px',
    };

    return <div ref={drag} style={teamItemStyle}>{team.name}</div>;
  };

  const ProjectItem: React.FC<{ task: { id: number; title: string; status: string; teamIds?: number[] } }> = ({ task }) => {
    const [, drop] = useDrop({
      accept: 'TEAM',
      drop: (item: { type: string; id: number }) => handleDrop(item.id, task.id),
    });

    const projectItemStyle: React.CSSProperties = {
      backgroundColor: theme.palette.secondary.main,
      border: '1px solid black',
      marginBottom: '5px',
      padding: '8px',
      color: 'inherit',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: '20px',
  };

  const teamListStyle: React.CSSProperties = {
    width: '20%',
    padding: '10px',
    marginLeft: '10%',
    textAlign: 'center',
    border: '3px solid black',
    marginTop: '1.4%'
  };
  
  const projectListStyle: React.CSSProperties = {
    width: '20%',
    padding: '10px',
    marginLeft: '10%',
    textAlign: 'center',
    border: '3px solid purple',
    marginTop: '1.4%'
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px', // Ajout de marge intérieure pour éloigner les boutons du bord
  };
  
  const buttonStyle: React.CSSProperties = {
    color: 'inherit',
    border: `1px solid ${theme.palette.primary.main}`, // Bordure avec la couleur du thème
    padding: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    textAlign: 'center',
    width: '48%',
  };

  const teamsWithProject = teams.filter((team) => team.projectId !== null && team.projectId !== undefined);
  const teamsWithoutProject = teams.filter((team) => team.projectId === null || team.projectId === undefined);
  
  const tableHeaderStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'center',

  };
  
  const tableCellStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    padding: '8px',
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <h1><center>Glisser les équipes dans le projet de votre choix</center></h1>
      <div style={subjectContainerStyle}>
        <div style={{ width: '400px', padding: '10px', border: '3px solid purple', marginTop: '1.4%' }}>
          <h2><center>les équipes</center></h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Équipes avec Projet</th>
                <th style={tableHeaderStyle}>Équipes sans Projet</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.max(teamsWithProject.length, teamsWithoutProject.length) }).map((_, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{teamsWithProject[index]?.name}</td>
                  <td style={tableCellStyle}>{teamsWithoutProject[index]?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={teamListStyle}>
          <h2>Teams</h2>
          {teams.map((team) => (
            <TeamItem key={team.id} team={team} />
          ))}
        </div>
        <div style={projectListStyle}>
          <h2>Projects</h2>
          {tasks.map((task) => (
            <ProjectItem key={task.id} task={task} />
          ))}
        </div>
      </div>
      <div style={buttonContainerStyle}>
        {showResetButton && (
          <div onClick={handleReset} style={buttonStyle}>
            Reset Teams
          </div>
        )}
        {showSaveButton && (
          <div onClick={handleSave} style={buttonStyle}>
            Save Changes
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Subject;