import projectManager from "./projectManagerModule";
import ProjectManager from "./projectManagerModule";


const uiController = () => {
    const projectListElem = document.querySelector('#project-list');
    const todoListELem = document.querySelector('#todo-list');
    const addProjectBtn = document.querySelector('#add-project');
    const addTodoBtn = document.querySelector('#add-todo');
    const modal = document.querySelector('#todo-modal');
    const closeBtn = document.querySelector('.close-button');
    const todoForm = document.querySelector('#todo-form');

    const renderProjects = () => {
        const projects = ProjectManager.getProjects();
        projectListElem.innerHTML = '';

        projects.forEach((project) => {
            const projectElem = document.createElement('div');
            projectElem.textContent = project.name;
            projectElem.addEventListener('click', () => {
                renderTodos(project);
                projectManager.activeProject(project.name);
            });
            projectListElem.appendChild(projectElem);
        });
    }

    const renderTodos = (project) => {
        todoListELem.innerHTML = '';
        
        project.getTodos().forEach((todo) => {
            const todoElem = document.createElement('div');
            todoElem.textContent = `${todo.title} - Due: ${todo.dueDate} 
                                    Description: ${todo.description} Priority: ${todo.priority}`;
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

    const addTodoListener = () => {
        addTodoBtn.addEventListener('click', () => {
            modal.style.display = 'block'; 

            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });
    }

    const addTodoItemListener = () => {
        todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const project = projectManager.currentProject;
        console.log(project);
        const formData = new FormData(todoForm);
        const todoTitle = formData.get('title');
        const todoDescription = formData.get('description');
        const todoDueDate = formData.get('due-date');
        const todoPriority = formData.get('priority');

        const newTodo = {
            title: todoTitle,
            description: todoDescription,
            dueDate: todoDueDate,
            priority: todoPriority,
        }

        project.addTodo(newTodo);
        renderTodos(project);
        modal.style.display = 'none';
        todoForm.reset(); //resets values in modal
        });
    }

    const init = () => {
        renderProjects();
        addProjectListener();
        addTodoListener();
        addTodoItemListener();
    }

    return {
        init,
    }
};

export default uiController;