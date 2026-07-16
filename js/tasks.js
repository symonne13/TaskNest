// ======================================
// TASKS.JS
// ======================================

const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

const todayTasksContainer =
document.getElementById("todayTasksContainer");

const taskModal =
document.getElementById("taskModal");

const modalTitle =
document.getElementById("modalTitle");

const searchInput =
document.getElementById("searchInput");
let editingTaskId = null;

let currentFilter = "all";
taskForm.addEventListener("submit", saveTask);
function saveTask(e){

    e.preventDefault();

const task = {

    id: editingTaskId || crypto.randomUUID(),

    userId: user.id,

    title:
    document.getElementById("taskTitle").value.trim(),

    description:
    document.getElementById("taskDescription").value.trim(),

    category:
    document.getElementById("taskCategory").value,

    priority:
    document.getElementById("taskPriority").value,

    dueDate:
    document.getElementById("taskDate").value,

    reminderTime:
    document.getElementById("taskReminder").value,

    reminderNote:
    document.getElementById("taskReminderNote").value.trim(),

    completed: false,

    completedAt: null,

    createdAt: new Date().toISOString()

};
    if(editingTaskId){

        const oldTask =
        getAllTasks().find(
            t=>t.id===editingTaskId
        );

        task.completed =
        oldTask.completed;

        task.completedAt =
        oldTask.completedAt;

        updateTask(task);

    }else{

        addTask(task);

    }

    taskForm.reset();

    editingTaskId = null;

    modalTitle.textContent = "Add Task";

    taskModal.classList.add("hidden");

    renderTasks();

}
function renderTasks(){

    let tasks = getUserTasks();

    taskList.innerHTML = "";

    if(tasks.length===0){

        taskList.innerHTML=`

            <div class="empty-state">

                <i class="fa-solid fa-box-open"></i>

                <h3>No Tasks Yet</h3>

                <p>Create your first task.</p>

            </div>

        `;

        return;

    }

    tasks.forEach(task=>{

        taskList.appendChild(

            createTaskCard(task)

        );

    });

}
function createTaskCard(task){

    const card = document.createElement("div");
    card.className = "task-item";
    card.dataset.id = task.id;

    if(task.completed){
        card.classList.add("completed");
    }

    card.innerHTML = `

        <div class="task-top">

            <div class="task-content">

                <h3 class="task-title">
                    ${task.title}
                </h3>

                <p class="task-description">
                    ${task.description || "No description"}
                </p>

                <div class="task-info">

                    <span class="task-tag">
                        ${task.category}
                    </span>

                    <span class="task-tag">
                        ${task.priority}
                    </span>

                    <span class="task-tag">
                        📅 ${task.dueDate}
                    </span>

                </div>

            </div>

            <div class="task-actions">

                <button class="complete-btn"
                        data-action="complete">

                    <i class="fa-solid fa-check"></i>

                </button>

                <button class="edit-btn"
                        data-action="edit">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete-btn"
                        data-action="delete">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

    `;

    return card;

}
taskList.addEventListener("click",(e)=>{

    const button = e.target.closest("button");

    if(!button) return;

    const action = button.dataset.action;

    const taskCard =
    button.closest(".task-item");

    const taskId =
    taskCard.dataset.id;

    switch(action){

        case "complete":

            completeTask(taskId);

            renderTasks();

            updateDashboard();

            break;

        case "edit":

            editTask(taskId);

            break;

        case "delete":

            deleteTaskUI(taskId);

            break;

    }

});
function deleteTaskUI(taskId){

    const confirmDelete =
    confirm("Delete this task?");

    if(!confirmDelete) return;

    deleteTask(taskId);

    renderTasks();

    updateDashboard();

}
function editTask(taskId){

    const task =
    getAllTasks().find(

        t=>t.id===taskId

    );

    if(!task) return;

    editingTaskId = task.id;

    modalTitle.textContent =
    "Edit Task";

    taskTitle.value =
    task.title;

    taskDescription.value =
    task.description;

    taskCategory.value =
    task.category;

    taskPriority.value =
    task.priority;

    taskDate.value =
    task.dueDate;

    taskReminder.value =
    task.reminderTime;

    taskModal.classList.remove("hidden");

}
function completeTask(taskId){

    const tasks = getAllTasks();

    const task = tasks.find(t => t.id === taskId);

    if(!task) return;

    // Toggle completion
    task.completed = !task.completed;

    task.completedAt = task.completed
        ? new Date().toISOString()
        : null;

    // Save updated task
    updateTask(task);

    // Refresh UI
    renderTasks();
    updateDashboard();

}
function updateDashboard(){

    const stats = getTaskStatistics();

    totalTasks.textContent = stats.total;
    pendingTasks.textContent = stats.pending;
    completedTasks.textContent = stats.completed;
    overdueTasks.textContent = stats.overdue;

    // renderTodayTasks();
    // renderCharts();

}
document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        renderTasks();

        updateDashboard();

    }

);