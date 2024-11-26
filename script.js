document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    if (taskText === "") return; // Prevent empty tasks

    const taskList = document.getElementById("task-list");

    const listItem = createTaskElement(taskText);
    taskList.appendChild(listItem);

    saveTasks(); // Save to localStorage
    taskInput.value = "";
}

function createTaskElement(taskText) {
    const listItem = document.createElement("li");
    listItem.innerText = taskText;

    listItem.addEventListener("click", function () {
        listItem.classList.toggle("completed");
        saveTasks(); // Save changes to localStorage
    });

    const deleteBtn = document.createElement("span");
    deleteBtn.innerText = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        listItem.remove();
        saveTasks(); // Update localStorage
    };

    listItem.appendChild(deleteBtn);
    return listItem;
}

function clearAll() {
    document.getElementById("task-list").innerHTML = "";
    localStorage.removeItem("tasks");
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(item => {
        tasks.push({ text: item.childNodes[0].textContent, completed: item.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        const taskList = document.getElementById("task-list");
        tasks.forEach(task => {
            const listItem = createTaskElement(task.text);
            if (task.completed) listItem.classList.add("completed");
            taskList.appendChild(listItem);
        });
    }
}
