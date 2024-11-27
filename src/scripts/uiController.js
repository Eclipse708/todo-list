import projectManager from "./projectManagerModule";
import ProjectManager from "./projectManagerModule";

const uiController = () => {
    const projectListElem = document.querySelector('#project-list');
    const todoListELem = document.querySelector('#todo-list');
    const addProjectBtn = document.querySelector('#add-project');
    const addTodoBtn = document.querySelector('#add-todo');
    const modal = document.querySelector('#todo-modal');
    const projectModal = document.querySelector('#project-modal');
    const closeBtn = document.querySelector('.close-button');
    const closeProjectBtn = document.querySelector('.close-project-modal-btn');
    const todoForm = document.querySelector('#todo-form');
    const projectForm = document.querySelector('#project-form');

    const renderProjects = () => {
        const projects = ProjectManager.getProjects();
        projectListElem.innerHTML = '';

        projects.forEach((project) => {
            const projectContainer = document.createElement('div');
            const projectElem = document.createElement('div');
            const projectOptions = document.createElement('div');
            const projectOptionsBtn = document.createElement('button');
            const renameProjectBtn = document.createElement('button');
            const removeProjectBtn = document.createElement('button');
            
            projectOptionsBtn.textContent = '⋮';
            renameProjectBtn.textContent = 'Rename';
            removeProjectBtn.textContent = 'Remove'; 
            projectElem.textContent = project.name;

            projectOptions.classList.add('dropdown');
            projectOptionsBtn.classList.add('project-options-btn');
            projectOptions.classList.add('project-options-dropdown-menu');
            projectContainer.classList.add('project-container');
            
            projectOptions.appendChild(renameProjectBtn);
            projectOptions.appendChild(removeProjectBtn);

            projectOptions.style.display = 'none';

            projectOptionsBtn.addEventListener('click', () => {
                projectOptions.style.display = projectOptions.style.display == 'none' ? 'block' : 'none';
            });

            document.addEventListener('click', (event) => {
                if (event.target != document.querySelector('.project-options-dropdown-menu') &&
                event.target != document.querySelector('.project-options-btn')) {
                    projectOptions.style.display = 'none';
                }
            });

            removeProjectBtn.addEventListener('click', () => {
                ProjectManager.removeProject(project.name);
                renderProjects();
            });

            renameProjectBtn.addEventListener('click', () => {
                let newName = prompt('Enter new name');
                ProjectManager.renameProject(project.name, newName);
                renderProjects();
            });

            projectContainer.appendChild(projectElem);
            projectContainer.appendChild(projectOptionsBtn);
            projectContainer.appendChild(projectOptions);

            projectElem.addEventListener('click', () => {
                ProjectManager.activeProject(project.name);
                renderTodos(project);
            });

            projectListElem.appendChild(projectContainer);
        });
    }

    const renderTodos = (project) => {
        todoListELem.innerHTML = '';
        
        project.getTodos().forEach((todo) => {
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            const todoElem = document.createElement('div');
            const todoOptions = document.createElement('div');
            const todoOptionsBtn = document.createElement('button');
            const todoEdit = document.createElement('button');
            const todoDel = document.createElement('button');

            todoOptionsBtn.textContent = '⋮';
            todoEdit.textContent = 'Edit';
            todoDel.textContent = 'Delete';

            todoOptions.classList.add('dropdown');
            todoOptionsBtn.classList.add('options-btn');
            todoOptions.classList.add('dropdown-menu');
            
            todoOptions.appendChild(todoEdit);
            todoOptions.appendChild(todoDel);

            todoOptions.style.display = 'none';

            todoOptionsBtn.addEventListener('click', () => {
                todoOptions.style.display = todoOptions.style.display == 'none' ? 'block' : 'none';
            });

            document.addEventListener('click', (event) => {
                if (event.target != document.querySelector('.dropdown-menu') &&
                event.target != document.querySelector('.options-btn')) {
                    todoOptions.style.display = 'none';
                }
            });

            todoElem.textContent = `${todo.title} - Due: ${todo.dueDate} 
                                    Description: ${todo.description} Priority: ${todo.priority}`;
            
            li.appendChild(todoElem);
            li.appendChild(todoOptionsBtn);
            li.appendChild(todoOptions);

            todoDel.addEventListener('click', () => {
                project.removeTodo(todo.title);
                renderTodos(project);
            });

            todoEdit.addEventListener('click', () => {
                const updateTodo = {
                    title: 'rand',
                    description: 'Rand2',
                    dueDate: 'Rand3',
                    priority: 'Rand4'
                }

                project.editTodo(todo, updateTodo);
                renderTodos(project);
            });

            ul.appendChild(li);
            todoListELem.appendChild(ul);
        });
    };

    const addProjectListener = () => {
        addProjectBtn.addEventListener('click', () => {
            projectModal.style.display = 'block';
        });

        closeProjectBtn.addEventListener('click', () => {
            projectModal.style.display = 'none';
        });
    }

    const addProjectItemListener = () => {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(projectForm);
            const projectTitle = formData.get('title');

            ProjectManager.addProject(projectTitle);
            renderProjects();
            projectModal.style.display = 'none';
            projectForm.reset();
        })
    }

    const addTodoListener = () => {
        addTodoBtn.addEventListener('click', () => {
            modal.style.display = 'block'; 
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    const addTodoItemListener = () => {
        todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const project = ProjectManager.getCurrentProject();
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
        // todoForm.reset(); //resets values in modal
        });
    }

    const init = () => {
        renderProjects();
        addProjectListener();
        addTodoListener();
        addTodoItemListener();
        addProjectItemListener();
    }

    return {
        init,
    }
};

export default uiController;