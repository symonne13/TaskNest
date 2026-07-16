// =====================================
// TASKNEST ANALYTICS
// =====================================

let statusChart;
let weeklyChart;
let trendChart;


document.addEventListener("DOMContentLoaded",()=>{

    initAnalytics();

});


function initAnalytics(){

    renderAnalytics();

}



function renderAnalytics(){

    const tasks = getUserTasks();


    createStatusChart(tasks);

    createWeeklyChart(tasks);

   

}
// =====================================
// STATUS PIE CHART
// =====================================

function createStatusChart(tasks){


    const canvas =
    document.getElementById("statusPieChart");


    if(!canvas) return;


    const completed =
    tasks.filter(task=>task.completed).length;


    const pending =
    tasks.filter(task=>!task.completed).length;



    if(statusChart){

        statusChart.destroy();

    }


    statusChart = new Chart(canvas,{

        type:"pie",

        data:{

            labels:[

                "Completed",

                "Pending"

            ],

            datasets:[{

                data:[

                    completed,

                    pending

                ]

            }]

        }

    });


}
// =====================================
// WEEKLY PRODUCTIVITY BAR CHART
// =====================================

function createWeeklyChart(tasks){

    const canvas =
    document.getElementById("weeklyBarChart");


    if(!canvas) return;


    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    const counts = [
        0,0,0,0,0,0,0
    ];


    tasks.forEach(task=>{


        if(task.completedAt){

            const date =
            new Date(task.completedAt);


            const day =
            date.getDay();


            counts[day]++;

        }


    });



    if(weeklyChart){

        weeklyChart.destroy();

    }



    weeklyChart = new Chart(canvas,{

        type:"bar",

        data:{

            labels:days,

            datasets:[{

                label:"Completed Tasks",

                data:counts

            }]

        },

        options:{

            responsive:true,

            scales:{

                y:{

                    beginAtZero:true

                }

            }

        }

    });


}
