import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuthUser } from '../contexts/AuthUserContext';
import { getAllTeams, getProjects } from '../rest/queries';
import { Team } from '../models/Team';
import { Project } from '../models/Project';

interface Task {
  id: number;
  title: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  onDrop: (taskId: number, newStatus: string) => void;
}

interface TaskListProps {
  title: string;
  tasks: Task[];
  status: string;
  onDrop: (taskId: number, newStatus: string) => void;
}

const EmptyDropZone: React.FC<{ onDrop: (newStatus: string) => void }> = ({ onDrop }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: () => onDrop(''),
    canDrop: () => true,
  });

  return (
    <div
      ref={(node) => drop(node)}
      style={{ border: '1px dashed #ccc', minHeight: '50px', margin: '8px' }}
    >
      (Déposer ici)
    </div>
  );
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDrop }) => {
  const [, dragRef] = useDrag({
    type: 'TASK',
    item: { id: task.id, status: task.status },
  });

  return (
    <div
      ref={dragRef}
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        margin: '8px',
        cursor: 'move',
      }}
    >
      {task.title}
    </div>
  );
};

const TaskList: React.FC<TaskListProps> = ({ title, tasks, status, onDrop }) => {
    const [projects, setProjects] = React.useState([] as Project[])
    useEffect(() => {
        // Appel à getProjects pour récupérer les sujets 
        getProjects().then((response) => {
          if (response.responseCode === 200 && response.data) {
            //map du name
            setProjects(response.data);

          } else {
            console.log(response.data);
          }
        });
      }, [projects]); 
  
    const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number; status: string }) => onDrop(item.id, status),
    canDrop: () => true,
  });

  return (
    <div
      ref={(node) => drop(node)}
      style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px', width: '200px', minHeight: '100px' }}
    >
      <h3>{title}</h3>
      <EmptyDropZone onDrop={(newStatus) => onDrop(-1, newStatus)} />
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskItem key={task.id} task={task} onDrop={onDrop} />
        ))}
    </div>
  );
};

const Subject: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teams, setTeams] = React.useState([] as Team[])
  const authUser = useAuthUser();

  useEffect(() => {
    // Appel à getAllTeams pour récupérer les équipes
    getAllTeams().then((response) => {
      if (response.responseCode === 200 && response.data) {
        //map du name
        setTeams(response.data);
      } else {
        console.log(response.data);
      }
    });
  }, [teams]); // Utilisation de useEffect pour appeler getAllTeams 

 
  useEffect(() => {
    // Appel à getProjects pour récupérer les sujets
    getProjects().then((response) => {
      if (response.responseCode === 200 && response.data) {
        // Utilisation directe du résultat dans setTasks
        setTasks(response.data.map((project) => ({
          id: project.id || 0, // Assure que id n'est jamais undefined
          title: project.name,
          status: 'undefined',
        })));
      } else {
        console.log(response.data);
      }
    });
  }, []);

  const handleDrop = (taskId: number, newStatus: string) => {
    if (newStatus && taskId === -1) {
      // If dropping in an empty zone, add the new task at the end
      setTasks([...tasks, { id: tasks.length + 1, title: `Task ${tasks.length + 1}`, status: newStatus }]);
    } else if (!newStatus && taskId !== -1) {
      // If dragging from the list to a section, remove the task from the list
      setTasks(tasks.filter((task) => task.id !== taskId));
    } else {
      // If dragging within sections, update the task status
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '20px' }}>
        <div style={{ width: '200px', marginRight: '20px' }}>
          <h2>Liste des sujets</h2>
          {tasks
            .filter((task) => task.status === 'undefined')
            .map((task) => (
              <TaskItem key={task.id} task={task} onDrop={handleDrop} />
            ))}
        </div>
        {teams.map((team, index) => (
          <TaskList key={index} title={team.name} tasks={tasks} status={`Section ${index + 1}`} onDrop={handleDrop} />
        ))}
      </div>
    </DndProvider>
  );
};

export default Subject;