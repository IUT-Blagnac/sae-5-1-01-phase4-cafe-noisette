import {useEffect} from "react";
import {Project} from "../models/Project";
import {getProjects} from "../rest/queries";
import DraggableProjectPreferenceList from "./DraggableProjectPreferenceList";
import {DropResult} from "react-beautiful-dnd";
import {reorder, reorderListByIds} from "../utils/utils";

interface ProjectPreferencesSelectProps {
    projects: Project[]
    setProjects: (projects: Project[]) => void
    preferenceIds: number[]
}

export const ProjectPreferencesSelect = (props: ProjectPreferencesSelectProps) => {
    const { projects, setProjects, preferenceIds } = props

    const onDragEnd = ({ destination, source }: DropResult) => {
        if (!destination) return;

        const newProjects = reorder<Project>(projects, source.index, destination.index);

        setProjects(newProjects);
    };

    useEffect(() => {
        requestProjects();
    }, []);

    useEffect(() => {
        setProjects(reorderListByIds<Project>(projects, preferenceIds, "id"))
    }, [preferenceIds]);

    function requestProjects () {
        getProjects().then((response) => {
                if (response.responseCode === 200) {
                    if (response.data) {
                        if (preferenceIds.length > 0) {
                            const orderedProjects = reorderListByIds<Project>(response.data, preferenceIds, "id")
                            setProjects(orderedProjects);
                        } else {
                            setProjects(response.data);
                        }
                    }
                } else {
                    console.log("Error while getting projects: " + response.errorMessage);
                }
            }
        )
    }

    return <DraggableProjectPreferenceList items={projects} onDragEnd={onDragEnd} />
}