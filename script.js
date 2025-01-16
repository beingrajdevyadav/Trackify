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
    saveToLocalStorage(){
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}