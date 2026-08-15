const themeRipple = document.getElementById("themeRipple");
const toast = document.getElementById("toast");
const themeBtn = document.getElementById("themeBtn");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const searchTask = document.getElementById("searchTask");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let searchText = "";

// Page Load
renderTasks();

// Add Task
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        showToast("⚠️ Please enter a task", "warning");
        taskInput.focus();
        return;
    }

    tasks.push({

    id: Date.now(),

    text: text,

    completed: false,

    dueDate: dueDate.value,

    priority: priority.value

});

    taskInput.value = "";
    dueDate.value = "";
    priority.value = "Medium";

    saveTasks();
    showToast("✅ Task Added");
    renderTasks();
}

// Save LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showToast(message, type = "success") {

    toast.innerText = message;

    toast.className = "";

    if(type === "error"){
        toast.classList.add("error");
    }

    if(type === "warning"){
        toast.classList.add("warning");
    }

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

// Render Tasks
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (searchText !== "") {

    filteredTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(searchText.toLowerCase())
    );

}

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.dataset.id = task.id;

        li.innerHTML = `

    <div>

        <span>${task.text}</span>

    <br>

    <small>📅 ${task.dueDate || "No Date"}</small>

    <br>

    <small class="priority ${task.priority.toLowerCase()}">

        ${task.priority}

    </small>

    </div>

    <div class="actions">

        <button class="complete">

        ${task.completed ? "Undo" : "✔"}

        </button>

    <button class="edit">

        Edit

    </button>

    <button class="delete">

        Delete

    </button>

    </div>

    `;

        taskList.appendChild(li);

    });

    const pending = tasks.filter(task => !task.completed).length;

    taskCount.innerText = `${pending} Task(s) Left`;

    const completed = tasks.filter(task => task.completed).length;

    const total = tasks.length;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressFill.style.width = percent + "%";

    progressText.innerText = percent + "%";

   

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        renderTasks();

    });

});

clearCompletedBtn.addEventListener("click", function () {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    showToast("🧹 Completed Tasks Cleared","error");
    renderTasks();

});

}

 taskList.addEventListener("click", function (e) {

    const li = e.target.closest(".task");

    if (!li) return;

    const id = Number(li.dataset.id);

    // Delete
    if (e.target.classList.contains("delete")) {

        tasks = tasks.filter(task => task.id !== id);

        saveTasks();
        showToast("🗑 Task Deleted","error");
        renderTasks();

    }

    // Complete
    if (e.target.classList.contains("complete")) {

        tasks = tasks.map(task => {

            if (task.id === id) {

                task.completed = !task.completed;

            }

            return task;

        });

        saveTasks();
        const task = tasks.find(t => t.id === id);

        showToast(
            task.completed ? "✔ Task Completed" : "↩ Task Restored",
            task.completed ? "success" : "warning"
        );

        renderTasks();
    }

    // Edit
    if (e.target.classList.contains("edit")) {

        const task = tasks.find(task => task.id === id);

        const updated = prompt("Edit Task", task.text);

        if (updated !== null && updated.trim() !== "") {

            task.text = updated.trim();

            saveTasks();
            showToast("✏ Task Updated");
            renderTasks();

        }

    }

});

searchTask.addEventListener("input", function () {

    searchText = this.value;

    renderTasks();

});

themeBtn.addEventListener("click", function (e) {

    // Ripple Position
    themeRipple.style.left = e.clientX + "px";
    themeRipple.style.top = e.clientY + "px";

    themeRipple.classList.add("active");

    setTimeout(() => {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");
            themeBtn.innerHTML="☀️";

        }else{

            localStorage.setItem("theme","light");
            themeBtn.innerHTML="🌙";

        }

    },250);

    setTimeout(()=>{

        themeRipple.classList.remove("active");

    },800);

});