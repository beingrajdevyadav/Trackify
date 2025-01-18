class TodoApp {
    constructor() {
        // to get data from local storage or to assign empty array
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        // to select todoList ul tag
        this.todoList = document.getElementById("todoList");
        // to select todoInput tag
        this.todoInput = document.getElementById("todoInput");
        // to select addTodoBtn tag
        this.addTodoBtn = document.getElementById("addTodoBtn");
        // to select editTodoBtn tag
        this.saveEditedTodoBtn = document.getElementById("saveEditedTodoBtn");
        // to select indexHolder input
        this.indexHolder = document.getElementById("indexHolder");

        // to handle addTodoBtn click
        this.addTodoBtn.addEventListener("click", () => this.addTodo());
        // to handle saveEditedTodoBtn click
        this.saveEditedTodoBtn.addEventListener("click", () => this.saveEditedTodo());
        this.render();

    }

    // to save in local storage
    saveToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    // to add todo item
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return alert("Task cannot be empty!");

        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        };

        this.todos.push(newTodo);
        this.saveToLocalStorage();
        this.todoInput.value = "";
        this.render();
    }

    // to edit todo
    editTodo(id) {

        this.todos.map(todo => {

            if (todo.id === id) {
                console.log(todo);
                this.todoInput.value = todo.text;
                this.indexHolder.value = todo.id;
                // console.log(this.indexHolder)
            }
        }

        );

        // to save and show
        this.saveToLocalStorage();
        this.render();

    }
    // to save edited todo
    saveEditedTodo() {
        const todoText = this.todoInput.value.trim();
        const indexHolderText = +this.indexHolder.value;
    
        console.log('Edited Text:', todoText);
        console.log('Todo ID:', indexHolderText);
    
        this.todos = this.todos.map(todo =>
            todo.id === indexHolderText ? { ...todo, text: todoText } : todo
        );
    
        console.log('Updated Todos:', this.todos);
    
        this.todoInput.value = "";
        this.indexHolder.value = "";
        this.saveToLocalStorage();
        this.render();
    }
    


    // to toggle Complete
    toggleComplete(id) {
        this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        this.saveToLocalStorage();
        this.render();
    }

    // to delete todo
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage();
        this.render();
    }

    // to render todos
    render() {
        this.todoList.innerHTML = '';
        this.todos.forEach(todo => {
            const li = document.createElement("li");
            li.className = 'todo-item';
            if (todo.completed)
                li.classList.add("completed");

            li.innerHTML = `
            <span>${todo.text}</span>

            <div>
            <button onclick="app.toggleComplete(${todo.id})"><i class="fa-solid fa-square-check"></i></button>
            <button onclick="app.editTodo(${todo.id})"><i class="fa-regular fa-pen-to-square"></i></button>
            <button onclick="app.deleteTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
            `;

            this.todoList.appendChild(li);
        })
    }
};

// creating an instance of TodoApp class
const app = new TodoApp();
// document.addEventListener('DOMContentLoaded', () => {
//     const app = new TodoApp();
// });