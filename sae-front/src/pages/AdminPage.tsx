import {useAuthUser} from "../contexts/AuthUserContext";
import {ProjectPreferencesSelect} from "../components/ProjectPreferencesSelect";
import {useState} from "react";
import {Project} from "../models/Project";

export const AdminPage = () => {
    const user = useAuthUser()
    const [projects, setProjects] = useState<Project[]>([])

    return <ProjectPreferencesSelect projects={projects} setProjects={setProjects} />
}