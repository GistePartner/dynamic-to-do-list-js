// Get references to elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    // Create list item (li)
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Add event to remove button
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append remove button to li
    li.appendChild(removeBtn);

    // Append li to task list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";
  }
}

// Add click event listener to Add button
addTaskBtn.addEventListener("click", addTask);

// Also allow pressing "Enter" to add task
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
