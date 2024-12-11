import projectManager from "./projectManagerModule";
import ProjectManager from "./projectManagerModule";

const uiController = () => {
    const projectListElem = document.querySelector('#project-list');
    const todoListELem = document.querySelector('#todo-list');
    const addProjectBtn = document.querySelector('#add-project');
    const addTodoBtn = document.querySelector('#add-todo');
    const modal = document.querySelector('#todo-modal');
    const projectModal = document.querySelector('#project-modal');
    const editTodoModal = document.querySelector('#edit-todo-modal');
    const closeBtn = document.querySelector('.close-button');
    const closeProjectBtn = document.querySelector('.close-project-modal-btn');
    const editCloseBtn = document.querySelector('.edit-close-button');
    const todoForm = document.querySelector('#todo-form');
    const projectForm = document.querySelector('#project-form');
    const editTodoForm = document.querySelector('#edit-todo-form');

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
            renameProjectBtn.classList.add('project-options-buttons');
            removeProjectBtn.classList.add('project-options-buttons');
            
            projectOptions.appendChild(renameProjectBtn);
            projectOptions.appendChild(removeProjectBtn);

            projectOptions.style.display = 'none';

            projectOptionsBtn.addEventListener('click', () => {
                projectOptions.style.display = projectOptions.style.display == 'none' ? 'block' : 'none';
            });

            document.addEventListener('click', (event) => {
                if (!projectOptions.contains(event.target) && event.target !== projectOptionsBtn) {
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
                const selectedProject = ProjectManager.activeProject(project.name);
                renderTodos(selectedProject);
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
            const todoLeft = document.createElement('div');
            const todoRight = document.createElement('div');
            const date = document.createElement('span');
            const priority = document.createElement('span'); 
            const checkbox = document.createElement('input');
    
            checkbox.type = 'checkbox';
            checkbox.classList.add('todo-checkbox');
    
            todoOptionsBtn.textContent = '⋮';
            todoEdit.textContent = 'Edit';
            todoDel.textContent = 'Delete';
    
            todoOptions.classList.add('dropdown');
            todoOptionsBtn.classList.add('options-btn');
            todoOptions.classList.add('dropdown-menu');
            date.classList.add('date');
            todoEdit.classList.add('todo-edit-options-buttons');
            todoDel.classList.add('todo-edit-options-buttons');
            todoLeft.classList.add('todo-left');
            todoRight.classList.add('todo-right');
    
            todoOptions.appendChild(todoEdit);
            todoOptions.appendChild(todoDel);
    
            todoOptions.style.display = 'none';
    
            todoOptionsBtn.addEventListener('click', (e) => {
                todoOptions.style.display = todoOptions.style.display == 'none' ? 'block' : 'none';
                e.stopPropagation();
            });
    
            document.addEventListener('click', (event) => {
                if (event.target.closest != document.querySelector('.dropdown-menu') 
                    && event.target.closest != document.querySelector('.options-btn')) {
                    todoOptions.style.display = 'none';
                }
            });
    
            todoLeft.innerHTML = `  <div class="todo-heading">
                                    <div class="todo-title">${todo.title}</div>
                                    <div class="todo-description">${todo.description}</div>
                                    </div>`;

            priority.innerHTML = `${todo.priority}`;
            date.innerHTML = `${todo.dueDate}`;
    
            if (todo.priority === 'low') {
                priority.classList.add('priority-low');
            } else if (todo.priority === 'medium') {
                priority.classList.add('priority-medium');
            } else if (todo.priority === 'high') {
                priority.classList.add('priority-high');
            }
    
            todoRight.appendChild(priority);
            todoRight.appendChild(date);
            todoRight.appendChild(todoOptionsBtn);
            
            todoLeft.prepend(checkbox);
    
            li.appendChild(todoLeft);
            li.appendChild(todoRight);
            li.appendChild(todoOptions);

            checkbox.addEventListener('click', () => {
                if (checkbox.checked) {
                    todoLeft.classList.add('completed');
                    todo.toggleCompleted(true);
                } else {
                    todoLeft.classList.remove('completed');
                    todo.toggleCompleted(false); 
                }
            });

            todoDel.addEventListener('click', () => {
                project.removeTodo(todo.title);
                renderTodos(project);
            });
    
            todoEdit.addEventListener('click', () => {
                editTodoModal.style.display = 'block'; 
    
                editCloseBtn.addEventListener('click', () => {
                    editTodoModal.style.display = 'none';
                });
    
                updateTodo(todo);
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

    // Create todo edit function.
    const updateTodo = (todo) => {
        editTodoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const project = ProjectManager.getCurrentProject();
            const editFormData = new FormData(editTodoForm);
            const editTitle = editFormData.get('edit-title');
            const editDescription = editFormData.get('edit-description');
            const editDueDate = editFormData.get('edit-due-date');
            const editPriority = editFormData.get('edit-priority');
    
            const updatedTodo = {
                        id: todo.id,
                        title: editTitle,
                        description: editDescription,
                        dueDate: editDueDate,
                        priority: editPriority
                    }
    
            project.editTodo(todo, updatedTodo);
            renderTodos(project);
            editTodoModal.style.display = 'none';
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