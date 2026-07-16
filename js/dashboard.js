// ==========================================
// DASHBOARD.JS
// ==========================================

// ---------- Logged-in User ----------
const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {
        name: "Guest",
        phone: "",
        email: ""
    };

// ---------- DOM Elements ----------
const greeting = document.getElementById("greeting");
const todayDate = document.getElementById("todayDate");
const welcomeName = document.getElementById("welcomeName");

const sidebarUserName = document.getElementById("sidebarUserName");
const sidebarUserPhone = document.getElementById("sidebarUserPhone");

const pageTitle = document.getElementById("pageTitle");

const menuItems = document.querySelectorAll(".menu li");
const sections = document.querySelectorAll(".app-section");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

const logoutBtn = document.getElementById("logoutBtn");

const themeBtn = document.getElementById("themeBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");

// ==========================================
// USER DETAILS
// ==========================================

function loadUser() {

    sidebarUserName.textContent = loggedInUser.name;
    welcomeName.textContent = loggedInUser.name;

    sidebarUserPhone.textContent =
        loggedInUser.phone || loggedInUser.email || "";

}

loadUser();


// ==========================================
// GREETING
// ==========================================

function updateGreeting() {

    const hour = new Date().getHours();

    let text = "Good Evening";

    if(hour < 12){

        text = "Good Morning";

    }else if(hour < 17){

        text = "Good Afternoon";

    }

    greeting.textContent = `${text}, ${loggedInUser.name} 👋`;

}

updateGreeting();


// ==========================================
// DATE
// ==========================================

function updateDate(){

    const options = {

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    };

    todayDate.textContent =
        new Date().toLocaleDateString("en-GB",options);

}

updateDate();
// ==========================================
// LIVE CLOCK
// ==========================================

const liveClock =
document.getElementById("liveClock");

function updateClock(){

    const now = new Date();

    liveClock.textContent =
        now.toLocaleTimeString([],{

            hour:"2-digit",

            minute:"2-digit"

        });

}

updateClock();

setInterval(updateClock,1000);
// ==========================================
// MOBILE MENU
// ==========================================

menuBtn.addEventListener("click",()=>{

    sidebar.classList.toggle("open");

});
// ==========================================
// DARK MODE
// ==========================================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "theme",

        document.body.classList.contains("dark")
        ? "dark"
        : "light"

    );

}

themeBtn.addEventListener("click",toggleDarkMode);

if(toggleThemeBtn){

    toggleThemeBtn.addEventListener(
        "click",
        toggleDarkMode
    );

}

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}
// ==========================================
// LOGOUT
// ==========================================

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem("loggedInUser");

    window.location.href="login.html";

});
// ==========================================
// SECTION NAVIGATION
// ==========================================

const pageNames = {
    dashboard: "Dashboard",
    tasks: "My Tasks",
    calendar: "Calendar",
    reminders: "Reminders",
    analytics: "Analytics",
    settings: "Settings"
};

function showSection(sectionName){

    // Hide every section
    sections.forEach(section=>{
        section.classList.remove("active");
    });

    // Remove active menu
    menuItems.forEach(item=>{
        item.classList.remove("active");
    });

    // Show selected section
    const activeSection =
        document.getElementById(sectionName + "Section");

    if(activeSection){

        activeSection.classList.add("active");

    }

    // Highlight sidebar
    const activeMenu =
        document.querySelector(
            `.menu li[data-section="${sectionName}"]`
        );

    if(activeMenu){

        activeMenu.classList.add("active");

    }

    // Change page title
    pageTitle.textContent =
        pageNames[sectionName];

    // Close sidebar on phone
    if(window.innerWidth < 768){

        sidebar.classList.remove("open");

    }

}
menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        const section =
            item.dataset.section;

        showSection(section);

    });

});
document
.querySelectorAll(".action-card")
.forEach(button=>{

    button.addEventListener("click",()=>{

        const section =
            button.dataset.section;

        if(section){

            showSection(section);

        }

    });

});
const viewAllTasks =
document.getElementById("viewAllTasks");

viewAllTasks.addEventListener("click",()=>{

    showSection("tasks");

});
const floatingTaskBtn =
document.getElementById("floatingTaskBtn");

const addTaskPageBtn =
document.getElementById("addTaskPageBtn");

const newTaskBtn =
document.getElementById("newTaskBtn");

function openTaskModal(){

    document
        .getElementById("taskModal")
        .classList.remove("hidden");

}

floatingTaskBtn.addEventListener(
    "click",
    openTaskModal
);

addTaskPageBtn.addEventListener(
    "click",
    openTaskModal
);

newTaskBtn.addEventListener(
    "click",
    openTaskModal
);
const closeModal =
document.getElementById("closeModal");

closeModal.addEventListener("click",()=>{

    document
        .getElementById("taskModal")
        .classList.add("hidden");

});
const modal =
document.getElementById("taskModal");

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.add("hidden");

    }

});