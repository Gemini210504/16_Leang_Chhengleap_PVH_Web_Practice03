document.addEventListener("DOMContentLoaded", function () {
    
    const taskName = document.getElementById("task_name");
    const taskDate = document.getElementById("task_date");
    const taskPriority = document.getElementById("task_priority");
    const taskTableBody = document.getElementById("taskTableBody");
    const addTaskBtn = document.getElementById("addTaskBtn");

    
    const taskManager = {
        tasks: [], 

        addNewTask: function () {
            if (taskName.value === "" || taskDate.value === "") {
                alert("Please fill in all fields!");
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
        },

        displayTasks: function () {
        taskTableBody.innerHTML = "";

            this.tasks.forEach((task, index) => {
                const row = document.createElement("tr");
                row.className = "bg-white border-b text-gray-900";

                row.innerHTML = `
                    <td class="px-6 py-4">${task.name}</td>
                    <td class="px-6 py-4">${task.date}</td>
                    <td class="px-6 py-4 
                        ${task.priority === 'High' ? 'bg-red-200' : 
                        task.priority === 'Medium' ? 'bg-yellow-200' : 
                        'bg-green-200'}">
                        ${task.priority}
                    </td>
                    <td class="px-6 py-4 
                        ${task.status === 'Pending' ? 'bg-red-200' : 'bg-green-200'}">
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
