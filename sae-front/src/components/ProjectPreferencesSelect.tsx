import {useEffect, useState} from "react";
import {Project} from "../models/Project";
import {getProjects} from "../rest/queries";
import DraggableProjectPreferenceList from "./DraggableProjectPreferenceList";
import {DropResult} from "react-beautiful-dnd";
import {reorder} from "../utils/utils";

interface ProjectPreferencesSelectProps {
    projects: Project[]
    setProjects: (projects: Project[]) => void
}

export const ProjectPreferencesSelect = (props: ProjectPreferencesSelectProps) => {
    const { projects, setProjects } = props

    const onDragEnd = ({ destination, source }: DropResult) => {
        if (!destination) return;

        const newProjects = reorder<Project>(projects, source.index, destination.index);

        setProjects(newProjects);
    };

    useEffect(() => {
        requestProjects();
    }, []);

    function requestProjects () {
        getProjects().then((response) => {
                if (response.responseCode === 200) {
                    if (response.data) {
                        setProjects(response.data);
                    }
                } else {
                    console.log("Error while getting projects: " + response.errorMessage);
                }
            }
        )
    }

    return <DraggableProjectPreferenceList items={projects} onDragEnd={onDragEnd} />
}