// ==============================
// TASKNEST REMINDERS
// ==============================


document.addEventListener(
"DOMContentLoaded",
loadReminders
);



function loadReminders(){


const container =
document.getElementById("remindersContainer");


if(!container) return;



const tasks =
getUserTasks();



const reminders =
tasks.filter(task =>

    task.reminderTime

);



container.innerHTML="";



if(reminders.length===0){


container.innerHTML=`

<div class="empty-state">

<i class="fa-solid fa-bell-slash"></i>

<h3>No reminders</h3>

<p>Add reminder times when creating tasks.</p>

</div>

`;


return;


}



reminders.forEach(task=>{


const card =
document.createElement("div");


card.className="reminder-card";



card.innerHTML=`

<h3>

<i class="fa-solid fa-bell"></i>

${task.title}

</h3>


<p>

⏰ ${task.reminderTime}

</p>


<p>

${task.reminderNote || "No reminder note"}

</p>


<span>

${task.completed ? "✅ Completed":"⏳ Pending"}

</span>


`;



container.appendChild(card);



});



}
// ==============================
// AUTOMATIC REMINDER CHECKER
// ==============================

setInterval(checkReminders, 60000);



function checkReminders(){

    const tasks = getUserTasks();


    const now = new Date();


    const currentTime =
    now.toTimeString().slice(0,5);



    tasks.forEach(task=>{


        if(
            task.reminderTime === currentTime &&
            !task.completed
        ){

            showReminderNotification(task);

        }


    });


}




function showReminderNotification(task){


    if(
        Notification.permission === "granted"
    ){


        new Notification(
            "🔔 TaskNest Reminder",
            {

                body:
                `${task.title} - ${task.reminderNote || "Task reminder"}`

            }

        );


    }

}
document.addEventListener(
"DOMContentLoaded",
()=>{


if(
Notification.permission !== "granted"
){

Notification.requestPermission();

}


});