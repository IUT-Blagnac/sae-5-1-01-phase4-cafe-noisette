import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuthUser } from '../contexts/AuthUserContext';
import { addMemberTeam, addProjectTeam, getAllTeams, getProjects } from '../rest/queries';
import { Team } from '../models/Team';
import { Project } from '../models/Project';
import { useTheme } from '../utils/theme';
import toast from 'react-hot-toast';

interface SubjectProps {}

export interface ExtendedTeam extends Omit<Team, 'projectId'> {
  id?: number;
  projectId?: number | undefined;
}

const Subject: React.FC<SubjectProps> = () => {
  const [teams, setTeams] = useState<ExtendedTeam[]>([]);
  const [tasks, setTasks] = useState<{ id: number; title: string; status: string; teamIds?: number[] }[]>([]);
  const [showResetButton, setShowResetButton] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
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
      console.log(`Team ${teamId} is already assigned to a project.`);
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

    setShowResetButton(true);
    setShowSaveButton(true);
    
    console.log(`Team ${teamId} dropped on Project ${projectId}`);
    console.log(`Team ${teamId} is now in Project ${projectId}`);
  };

  const handleReset = () => {
    const resetTeams = teams.map((team) => ({ ...team, projectId: undefined as number | undefined }));
    setTeams(resetTeams);
  
    const resetTasks = tasks.map((task) => ({ ...task, teamIds: [] }));
    setTasks(resetTasks);
  
    setShowResetButton(false);
    setShowSaveButton(true);
  };
  
  const handleSave = () => {
    console.log(teams)
    console.log(tasks)
    // Logique pour sauvegarder les modifications
    {tasks.filter((task) => task.teamIds).map((task) => 
      {task.teamIds?.map((teamId) => {
        const team = teams.find((team) => team.id === teamId) as Team
        console.log(team)
        addProjectTeam(team, teamId).then((response) => {
          if (response.responseCode === 200) {
              if (response.data) {
                  toast.success("Les modifications ont été sauvegardées")
              }
          } else {
              console.log("Error while add project in team: " + response.errorMessage);
          }
      }
  )
      }
      )}
      )}
  
    setShowResetButton(false);
    setShowSaveButton(false);
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
      color: 'inherit'
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
    width: '200px',
    padding: '10px',
    marginRight: '10%'
  };

  const projectListStyle: React.CSSProperties = {
    width: '200px',
    padding: '10px',
    marginLeft: '10%'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: theme.palette.secondary.main,
    color: 'inherit',
    border: '1px solid black',
    padding: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    textAlign: 'center',
    width: '50%',
    margin: 'auto',
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={subjectContainerStyle}>
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
    </DndProvider>
  );
};

export default Subject;
