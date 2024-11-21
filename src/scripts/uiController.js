import projectManager from "./projectManagerModule";
import ProjectManager from "./projectManagerModule";


const uiController = () => {
    const projectListElem = document.querySelector('#project-list');
    const todoListELem = document.querySelector('#todo-list');
    const addProjectBtn = document.querySelector('#add-project');

    const renderProjects = () => {
        const projects = ProjectManager.getProjects();
        projectListElem.innerHTML = '';

        projects.forEach((project) => {
            const projectElem = document.createElement('div');
            projectElem.textContent = project.name;
            projectElem.addEventListener('click', () => {
                renderTodos(project);
            });
            projectListElem.appendChild(projectElem);
        });
    }

    const renderTodos = (project) => {
        todoListELem.innerHTML = '';
        
        project.getTodos().forEach((todo) => {
            const todoElem = document.createElement('div');
            todoElem.textContent = todo.title + '-' + todo.dueDate;
            todoListELem.appendChild(todoElem);
        });
    };

    const addProjectListener = () => {
        addProjectBtn.addEventListener('click', () => {
            const projectName = prompt('Enter project name');
            projectManager.addProject(projectName);
            renderProjects();
        });
    }
    const init = () => {
        renderProjects();
        addProjectListener();
    }

    return {
        init,
    }
};

export default uiController;