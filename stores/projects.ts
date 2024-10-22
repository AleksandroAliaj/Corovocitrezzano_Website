import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useFetch } from '#app';

interface Project {
    id: number;
    name: string;
    description: string;
    person: number
}

export const useProjectStore = defineStore('project', () => {
    const project = reactive([] as Project[]);

    async function init(){
        const { data } = await useFetch<Project[]>('/api/project');
        const list = data.value;
        if (list) {
            project.splice(0, project.length);  // Clear the list
            project.push(...list);
        }
    }

    function getPersonProjects(personId: number) {
        return project.filter((project: Project) => project.person === personId)
    }

    function getProject(projectId: number) {
        return project.find((p: Project) => p.id === projectId);
    }

    init()

    return { project, getPersonProjects, getProject };
});
