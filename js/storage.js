// ======================================
// TASKNEST STORAGE ENGINE
// Version 1.0
// ======================================

// Local Storage Keys
const TASKS_KEY = "tasknest_tasks";
const USERS_KEY = "tasknest_users";
const CURRENT_USER_KEY = "loggedInUser";
function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(CURRENT_USER_KEY)
    );

}
const user = getCurrentUser();
function getAllTasks() {

    const tasks =
        JSON.parse(
            localStorage.getItem(TASKS_KEY)
        );

    return tasks || [];

}
function saveAllTasks(tasks) {

    localStorage.setItem(
        TASKS_KEY,
        JSON.stringify(tasks)
    );

}
function getUserTasks() {

    const user = getCurrentUser();

    if(!user) return [];

    return getAllTasks().filter(task =>

        task.userId === user.id

    );

}
function generateTaskId(){

    return Date.now();

}
function addTask(task){

    const tasks = getAllTasks();

    tasks.push(task);

    saveAllTasks(tasks);

}
function deleteTask(taskId){

    const tasks = getAllTasks();

    const updated = tasks.filter(

        task => task.id !== taskId

    );

    saveAllTasks(updated);

}
function updateTask(updatedTask){

    const tasks = getAllTasks();

    const index = tasks.findIndex(

        task => task.id === updatedTask.id

    );

    if(index !== -1){

        tasks[index] = updatedTask;

        saveAllTasks(tasks);

    }

}
function completeTask(taskId){

    const tasks = getAllTasks();

    const task = tasks.find(t => t.id === taskId);

    if(!task) return;

    task.completed = !task.completed;

    task.completedAt = task.completed
        ? new Date().toISOString()
        : null;

    task.updatedAt = new Date().toISOString();

    saveAllTasks(tasks);

}

function getTodayTasks(){

    const today = new Date()
        .toISOString()
        .split("T")[0];

    return getUserTasks().filter(

        task => task.dueDate === today

    );

}
function getTaskStatistics(){

    const tasks = getUserTasks();

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;


    const pending = tasks.filter(
        task => !task.completed
    ).length;


    const today = new Date();


    const overdue = tasks.filter(task => {

        return (
            !task.completed &&
            new Date(task.dueDate) < today
        );

    }).length;


    return {

        total,
        completed,
        pending,
        overdue

    };

}