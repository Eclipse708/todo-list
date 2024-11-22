import projectManager from "./projectManagerModule";
import ProjectManager from "./projectManagerModule";


const uiController = () => {
    const projectListElem = document.querySelector('#project-list');
    const todoListELem = document.querySelector('#todo-list');
    const addProjectBtn = document.querySelector('#add-project');
    const addTodoBtn = document.querySelector('#add-todo');

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
            console.log(todo);
            const todoElem = document.createElement('div');
            todoElem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
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
            const project = projectManager.getProjects()[0];
            const todoTitle = prompt('Enter todo title');
            if (todoTitle) {
                const newTodo = {
                    title: todoTitle,
                    description: 'Test desc',
                    dueDate: '2024-12-31',
                    priority: 'High',
                    notes: 'Test notes'
                };
            project.addTodo(newTodo);
            renderTodos(project);
            }
        });
    }
    const init = () => {
        renderProjects();
        addProjectListener();
        addTodoListener();
    }

    return {
        init,
    }
};

export default uiController;