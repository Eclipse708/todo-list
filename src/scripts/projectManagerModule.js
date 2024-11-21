import Project from "./projectModule";

const projectManager = (() => {
    let projects = [];
    const defaultProject = new Project('Default');
    projects.push(defaultProject);

    const addProject = (name) => {
        const newProject = new Project(name);
        projects.push(newProject);
    };

    const removeProject = (name) => {
        projects = projects.filter(project => project.name != name);
    };

    const getProjects = () => projects;

    return {addProject, removeProject, getProjects};
})();

export default projectManager;