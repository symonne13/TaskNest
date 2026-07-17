// =================================
// TASKNEST SETTINGS.JS
// =================================


// ===============================
// INITIALIZE SETTINGS
// ===============================

document.addEventListener("DOMContentLoaded",()=>{

    loadSettingsProfile();

    initTheme();

    initProfile();

    initPassword();

    initExport();

    initImport();

    initClearCompleted();

});



// ===============================
// LOAD PROFILE
// ===============================

function loadSettingsProfile(){

    const user = getCurrentUser();

    if(!user) return;


    document.getElementById("settingsUserName").textContent =
    user.name || "User";


    document.getElementById("settingsUserEmail").textContent =
    user.email || "Not Set";


    document.getElementById("settingsUserPhone").textContent =
    user.phone || "Not Set";

}



// ===============================
// DARK MODE
// ===============================

function initTheme(){

    const btn =
    document.getElementById("toggleThemeBtn");


    const saved =
    localStorage.getItem("tasknest-theme");


    if(saved === "dark"){

        document.body.classList.add("dark");

    }
    else{

        document.body.classList.remove("dark");

    }



    if(btn){

        btn.onclick = ()=>{


            document.body.classList.toggle("dark");


            localStorage.setItem(

                "tasknest-theme",

                document.body.classList.contains("dark")
                ? "dark"
                : "light"

            );


        };

    }

}



// ===============================
// EDIT PROFILE
// ===============================

function initProfile(){

const openBtn =
document.getElementById("editProfileBtn");

const modal =
document.getElementById("profileModal");

const close =
document.getElementById("closeProfileModal");

const form =
document.getElementById("profileForm");


if(!openBtn) return;


openBtn.onclick = ()=>{


const user=getCurrentUser();


document.getElementById("profileName").value=user.name;

document.getElementById("profileEmail").value=user.email;

document.getElementById("profilePhone").value=user.phone;


modal.classList.remove("hidden");


};



close.onclick=()=>{

modal.classList.add("hidden");

};



form.onsubmit=(e)=>{


e.preventDefault();


let users =
JSON.parse(localStorage.getItem("tasknest_users")) || [];


let current =
getCurrentUser();



let index =
users.findIndex(
u=>u.phone===current.phone
);



if(index===-1){

alert("User account not found");

return;

}



users[index].name =
profileName.value;


users[index].email =
profileEmail.value;


users[index].phone =
profilePhone.value;



localStorage.setItem(
"tasknest_users",
JSON.stringify(users)
);



localStorage.setItem(
"loggedInUser",
JSON.stringify(users[index])
);



alert("Profile updated successfully");


modal.classList.add("hidden");


loadSettingsProfile();


};


}



// ===============================
// CHANGE PASSWORD
// ===============================

function initPassword(){


const btn =
document.getElementById("changePasswordBtn");


const modal =
document.getElementById("passwordModal");


const close =
document.getElementById("closePasswordModal");


const form =
document.getElementById("passwordForm");



if(!btn) return;



btn.onclick=()=>{

modal.classList.remove("hidden");

};



close.onclick=()=>{

modal.classList.add("hidden");

};



form.onsubmit=(e)=>{


e.preventDefault();


const user=getCurrentUser();


if(currentPassword.value !== user.password){

alert("Current password is incorrect");

return;

}


if(newPassword.value !== confirmPassword.value){

alert("Passwords do not match");

return;

}



user.password =
newPassword.value;



let users =
JSON.parse(localStorage.getItem("tasknest_users")) || [];


let index =
users.findIndex(
u=>u.phone===user.phone
);



users[index]=user;


localStorage.setItem(
"tasknest_users",
JSON.stringify(users)
);


localStorage.setItem(
"loggedInUser",
JSON.stringify(user)
);



alert("Password changed successfully");


modal.classList.add("hidden");


form.reset();


};


}



// ===============================
// EXPORT TASKS
// ===============================

function initExport(){


const btn =
document.getElementById("exportTasksBtn");


if(!btn)return;


btn.onclick=()=>{


const tasks=getUserTasks();


const blob =
new Blob(

[JSON.stringify(tasks,null,2)],

{type:"application/json"}

);



const link =
document.createElement("a");


link.href =
URL.createObjectURL(blob);


link.download =
"TaskNest-backup.json";


link.click();



};

}



// ===============================
// IMPORT TASKS
// ===============================

function initImport(){


const btn =
document.getElementById("importTasksBtn");


const file =
document.getElementById("importFile");



if(!btn)return;


btn.onclick=()=>{

file.click();

};



file.onchange=(e)=>{


const reader =
new FileReader();


reader.onload=()=>{


localStorage.setItem(

"tasknest_tasks",

reader.result

);



alert("Tasks imported successfully");


renderTasks();


};


reader.readAsText(e.target.files[0]);


};



}



// ===============================
// CLEAR COMPLETED
// ===============================

function initClearCompleted(){


const btn =
document.getElementById("clearCompletedBtn");


if(!btn)return;



btn.onclick=()=>{


let tasks=getAllTasks();


tasks =
tasks.filter(
task=>!task.completed
);



saveAllTasks(tasks);


renderTasks();


updateDashboard();


alert("Completed tasks cleared");


};


}