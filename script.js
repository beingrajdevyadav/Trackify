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

    // to toggle Complete
    toggleComplete(id){
        this.todos = this.todos.map(todo=>todo.id === id ? {...todo, completed: !todo.completed} : todo);
        this.saveToLocalStorage();
        this.render();
    }

    // to delete todo
    deleteTodo(id){
        this.todos = this.todos.filter(todo=>todo.id !== id  );
        this.saveToLocalStorage();
        this.render();
    }

    // to render todos
    render(){
        this.todoList.innerHTML = '';
        this.todos.forEach(todo=>{
            const li = document.createElement("li");
            li.className = 'todo-item';
            if(todo.completed)
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

