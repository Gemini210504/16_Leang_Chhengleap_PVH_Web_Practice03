document.addEventListener("DOMContentLoaded", function () {
    const taskName = document.getElementById("task_name");
    const taskDate = document.getElementById("task_date");
    const taskPriority = document.getElementById("task_priority");
    const taskTableBody = document.getElementById("taskTableBody");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const errorMessage = document.getElementById("error-message"); 

    const taskManager = {
        tasks: [],

        addNewTask: function () {
            try {
                if (taskName.value.trim() === "") {
                    document.getElementById("error-message-name").textContent = "Please fill in task name!";
                    throw new Error("Please fill in task name!");
                } else {
                    document.getElementById("error-message-name").textContent = "";
                }
            
                if (taskDate.value.trim() === "") {
                    document.getElementById("error-message-date").textContent = "Please fill in date!";
                    throw new Error("Please fill in date!");
                } else {
                    document.getElementById("error-message-date").textContent = "";
                }
            } catch (error) {
                console.error("Error:", error);
                return; 
            }
            

            let today = new Date();
            today.setHours(0, 0, 0, 0);
            let selectedDate = new Date(taskDate.value);
            try{
                if (selectedDate < today) {
                    document.getElementById("error-message-pastdate").textContent = "You can't input a past date!";
                    throw new Error("You can't input a past date!");
                    
                }
                else{
                    document.getElementById("error-message-pastdate").textContent = ""
                }

            }catch (error){
                console.error("Error:", error);
                return; 
            }
            

            const newTask = {
                name: taskName.value,
                date: taskDate.value,
                priority: taskPriority.value,
                status: "Pending",
            };

            this.tasks.push(newTask);
            this.displayTasks();

            taskName.value = "";
            taskDate.value = "";
            taskPriority.selectedIndex = 0; 
        },

        displayTasks: function () {
            taskTableBody.innerHTML = "";

            this.tasks.forEach((task) => {
                const row = document.createElement("tr");
                row.className = "border-b text-gray-900";

                let priorityColor;
                switch (task.priority) {
                    case "Medium":
                        priorityColor = "text-yellow-600";
                        break;
                    case "Low":
                        priorityColor = "text-green-600";
                        break;
                    default:
                        priorityColor = "text-red-600";
                        break;
                }

                row.innerHTML = `
                    <td class="px-6 py-4">${task.name}</td>
                    <td class="px-6 py-4">${task.date}</td>
                    <td class="px-6 py-4 ${priorityColor}">${task.priority}</td>
                    <td class="px-6 py-4 text-center bg-red-500 text-white rounded-xl">
                        ${task.status}
                    </td>
                `;

                taskTableBody.appendChild(row);
            });
        },
    };

    addTaskBtn.addEventListener("click", function () {
        taskManager.addNewTask();
    });
});
