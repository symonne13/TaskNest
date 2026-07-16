// ===========================================
// TaskNest Calendar
// ===========================================

const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];

let currentCalendarDate = new Date();

// ===========================================
// Render Calendar
// ===========================================

function renderCalendar() {

    const container = document.getElementById("calendarContainer");

    if (!container) return;

    container.innerHTML = "";

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    // Header

    const header = document.createElement("div");

    header.className = "calendar-header";

    header.innerHTML = `

        <button id="prevMonth">

            <i class="fa-solid fa-chevron-left"></i>

        </button>

        <h2>

            ${monthNames[month]} ${year}

        </h2>

        <button id="nextMonth">

            <i class="fa-solid fa-chevron-right"></i>

        </button>

    `;

    container.appendChild(header);

    // Weekdays

    const weekHeader = document.createElement("div");

    weekHeader.className = "calendar-weekdays";

    weekDays.forEach(day => {

        const div = document.createElement("div");

        div.textContent = day;

        weekHeader.appendChild(div);

    });

    container.appendChild(weekHeader);

    // Calendar Grid

    const grid = document.createElement("div");

    grid.className = "calendar-grid";

    // Empty cells

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");

        empty.className = "calendar-cell empty";

        grid.appendChild(empty);

    }

  // Days

for (let day = 1; day <= daysInMonth; day++) {

    const cell = document.createElement("div");

    cell.className = "calendar-cell";


    cell.innerHTML = `

        <span>${day}</span>

    `;


    // Highlight today

    const today = new Date();

    if (

        day === today.getDate() &&

        month === today.getMonth() &&

        year === today.getFullYear()

    ) {

        cell.classList.add("today");

    }


    // Get tasks

    const tasks = getUserTasks();


    const dateString =
    `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;


    const hasTask = tasks.some(

        task => task.dueDate === dateString

    );


    // Add task dot

    if(hasTask){

        const dot = document.createElement("div");

        dot.className = "task-dot";

        cell.appendChild(dot);

    }


    grid.appendChild(cell);

}
container.appendChild(grid);


// Previous Month

document.getElementById("prevMonth")
.addEventListener("click", () => {

    currentCalendarDate.setMonth(
        currentCalendarDate.getMonth() - 1
    );

    renderCalendar();

});


// Next Month

document.getElementById("nextMonth")
.addEventListener("click", () => {

    currentCalendarDate.setMonth(
        currentCalendarDate.getMonth() + 1
    );

    renderCalendar();

});


}


// Initial Load

document.addEventListener(
    "DOMContentLoaded",
    renderCalendar
);