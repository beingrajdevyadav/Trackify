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

        // to handle addTodoBtn click
        this.addTodoBtn.addEventListener("click", () => this.addTodoBtn());
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
        const newText = prompt("Edit your task : ");

        if (newText) {
            this.todos.map(todo =>
                todo.id === id ? {
                    ...todo, text: newText
                } : todo
            );
            this.saveToLocalStorage();
            this.render();
        }
    }

    toggleComplete(id){
        this.todos = this.todos.map(todo=>todo.id === id ? {...todo, completed: !todo.completed} : todo);
        this.saveToLocalStorage();
        this.render();
    }
}