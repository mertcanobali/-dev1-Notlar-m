document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>`;
            taskList.appendChild(li);
        });
    }

    window.addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();
    };

    window.deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    window.toggleTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    addTaskBtn.addEventListener("click", addTask);
    loadTasks();
});
