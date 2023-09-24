const listTaskEl = document.getElementById("listTask");
const modelTaskEl = document.getElementsByClassName("modelTask")[0];
let taskList;


export const createTask = (nameNewTask) => {

    let id =  `task_${Date.now()}`;
    updateDisplayTask(nameNewTask, false, id)
    taskList.push({ "task_id": id, "task_name": nameNewTask, "task_finish": false });
    saveTasks()
};

const updateTask = (type, parent, id) => {
    let indexTask = taskList.findIndex(task => task.task_id == id)
    let inputTextEl = parent.querySelector(`#text_${id}`)
    if(type === "wasChecked") {
        parent.classList.toggle("taskFinish")
        inputTextEl.disabled = !inputTextEl.disabled
        taskList[indexTask].task_finish = !taskList[indexTask].task_finish
    }
    if(type === "updateName") {
        let old = inputTextEl.placeholder
        if(inputTextEl.value.length < 5) {
            inputTextEl.value = old
        } else {
            inputTextEl.placeholder = inputTextEl.value
            taskList[indexTask].task_name = inputTextEl.value
        }
    }
    saveTasks()
};

export const deleteTask = (type, parent) => {
    if(type === "deleteOne") {
        let id = parent.id
        let indexTask = taskList.findIndex(task => task.task_id == id)
        let removeTask = parent.parentNode
        taskList.splice(indexTask, 1)
        listTaskEl.removeChild(removeTask)
    } else {
        let taskCompleted = taskList.filter(task => task.task_finish == true)
        taskCompleted.forEach(task => {
            let id = task.task_id
            let taskIndex = taskList.findIndex(x => x.task_id == id )
            let parent = listTaskEl.querySelector(`#${id}`)
            let removeTask = parent.parentNode
            listTaskEl.removeChild(removeTask)
            taskList.splice(taskIndex, 1)
        });
    }
    saveTasks()
};

export const getAllTasks = (which, buttons) => {
    buttons.forEach(button => {
        if (button.id == which) {
            button.classList.add("btnActive")
        } else {
            button.classList.remove("btnActive")
        }
        
    });
    
    let taskEls = listTaskEl.querySelectorAll('.task')
    taskEls.forEach(taskEl => {
        taskEl.classList.remove("hidden")
    });
    if (which == "completed") {
        let taskCompleted = taskList.filter(task => task.task_finish == false)
        taskCompleted.forEach(task => {
            let articleEl = listTaskEl.querySelector(`#${task.task_id}`)
            articleEl.parentNode.classList.add("hidden")
        });
    }
    if (which == "active") {
        let taskActive = taskList.filter(task => task.task_finish == true)
        taskActive.forEach(task => {
            let articleEl = listTaskEl.querySelector(`#${task.task_id}`)
            articleEl.parentNode.classList.add("hidden")
        });
    }
};

const saveTasks = () => {
    localStorage.setItem("TodoList_ab", JSON.stringify(taskList));
    const restEl = document.getElementById("rest")
    let taskActive = taskList.filter(task => task.task_finish == false)
    restEl.textContent = taskActive.length
};
export const restoreTasks = () => {
    taskList = localStorage.getItem("TodoList_ab")
        ? JSON.parse(localStorage.getItem("TodoList_ab"))
        : [];
    if(taskList.length != 0) {
        taskList.forEach(task => {
            updateDisplayTask(task.task_name, task.task_finish, task.task_id)
        });
    }
    saveTasks()
};

const updateDisplayTask = (nameTask, isTaskCompleted, taskId) => {
    let id = taskId;
    let task_name = nameTask;
    let task_finish = isTaskCompleted;
    let firstChildEl = listTaskEl.getElementsByTagName("li")[0];

    let cloneTaskEl = modelTaskEl.cloneNode(true);
    let articleEl = cloneTaskEl.getElementsByTagName("article")[0]
    let inputCheckboxEl = cloneTaskEl.getElementsByClassName('inputCheckbox')[0];
    let inputTextEl = cloneTaskEl.getElementsByClassName('inputText')[0];
    let labelCheckboxEl = cloneTaskEl.getElementsByClassName('labelCheckbox')[0];
    let labelTextEl = cloneTaskEl.getElementsByClassName('labelText')[0];
    let inputImgEl = cloneTaskEl.getElementsByClassName("inputImg")[0]

    inputCheckboxEl.addEventListener("click", (e) => {
        updateTask("wasChecked", e.target.parentNode, e.target.parentNode.id)
    })
    inputTextEl.addEventListener("blur", (e) => {
        updateTask("updateName", e.target.parentNode, e.target.parentNode.id)

    })
    inputImgEl.addEventListener("click", (e) => {
        deleteTask("deleteOne", e.target.parentNode)
    })

    if(isTaskCompleted) {
        articleEl.classList.add("taskFinish")
        inputTextEl.disabled = true
    }

    articleEl.id = id;
    inputTextEl.value = task_name
    inputTextEl.placeholder = task_name
    inputTextEl.id = `text_${id}`;
    inputTextEl.name = `text_${id}`;
    labelTextEl.htmlFor = `text_${id}`;
    inputCheckboxEl.id = `checkbox_${id}`;
    inputCheckboxEl.name = `checkbox_${id}`;
    inputCheckboxEl.checked = task_finish;
    labelCheckboxEl.htmlFor = `checkbox_${id}`;

    listTaskEl.insertBefore(cloneTaskEl, firstChildEl);
}