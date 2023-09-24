import { createTask, getAllTasks, restoreTasks, deleteTask } from "./taskController.js";

const nameNewTaskEl = document.getElementById("nameNewTask");
const listTaskEl = document.getElementById("listTask");
const newTodoEl = document.getElementById("newTodo");
const submitTaskEl = document.getElementById("submitTask");
const buttonsDisplayEls = document.querySelectorAll("#buttonsDisplay button")
const clearCompleted = document.getElementById("clearCompleted")

nameNewTaskEl.addEventListener("keyup", () => {
    if(nameNewTaskEl.value.length > 4) {
        submitTaskEl.disabled = false;
    } else {
        submitTaskEl.disabled = true;
    }
});
clearCompleted.addEventListener("click", deleteTask)
newTodoEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if(submitTaskEl.disabled == false) {
        createTask(nameNewTaskEl.value);
        nameNewTaskEl.value = ""
    }
});

buttonsDisplayEls.forEach(buttonsDisplayEl => {
    buttonsDisplayEl.addEventListener("click", () => {
        getAllTasks(buttonsDisplayEl.id, buttonsDisplayEls)
    })

});

window.addEventListener("load", () => {
    submitTaskEl.disabled = true;
    restoreTasks();
});
