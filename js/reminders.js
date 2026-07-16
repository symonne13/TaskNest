// =================================
// TaskNest Reminders
// =================================


function renderReminders(){

    const container =
    document.getElementById(
        "remindersContainer"
    );


    if(!container) return;


    const tasks = getUserTasks();


    const now = new Date();


    const reminders = tasks.filter(task=>{


        if(!task.reminder){
            return false;
        }


        const reminderDate =
        new Date(
            `${task.dueDate}T${task.reminder}`
        );


        return reminderDate >= now;


    });



    container.innerHTML="";



    if(reminders.length === 0){


        container.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-bell-slash"></i>

            <h3>No reminders</h3>

            <p>
            You have no upcoming reminders.
            </p>

        </div>

        `;


        return;

    }



    reminders.forEach(task=>{


        const card =
        document.createElement("div");


        card.className =
        "reminder-card";



        card.innerHTML = `


        <div class="reminder-icon">

            <i class="fa-solid fa-bell"></i>

        </div>


        <div class="reminder-info">


            <h3>
            ${task.title}
            </h3>


            <p>

            📅 ${task.dueDate}

            </p>


            <p>

            ⏰ ${task.reminder}

            </p>


            <span>

            ${task.priority}

            </span>


        </div>


        `;



        container.appendChild(card);


    });


}



document.addEventListener(
"DOMContentLoaded",
renderReminders
);