const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const buttonAdd = document.getElementById("input-button")
const completedCounter = document.getElementById("completed-counter")
const uncompletedCounter = document.getElementById("uncompleted-counter")

function updateCounters(){
    const completedTasks = document.querySelectorAll("li.completed").length
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length

    completedCounter.textContent = completedTasks
    uncompletedCounter.textContent = uncompletedTasks
}

function addTask(){
  const regex = /^[a-zA-Z0-9-éèêëàÀïÉÈỀÎÎ'" -]+$/

  const task = inputBox.value.trim()

    if (!regex.test(task)) {
        alert("Please write down a task")
        inputBox.value= ""
        console.log("no task added")
        return
    }
    
    const li = document.createElement("li")
    li.innerHTML = `

    <label>
        <input type="checkbox">
        <span>${task} </span>
    </label>
    <span class="edit-button">Edit</span>
    <span class="delete-button">Delete</span>
    `

    listContainer.appendChild(li)
    inputBox.value = ""
    console.log("new task added")
    updateCounters()

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-button");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-button");

    checkbox.addEventListener("click", function(){
        li.classList.toggle("completed", checkbox.checked);
        console.log("click checkbox")
        updateCounters()
    })

    editBtn.addEventListener("click", function(){
        const update = prompt("Edit task: ", taskSpan.textContent)
        if (update !== null){
            taskSpan.textContent = update
            li.classList.remove("completed")
            checkbox.checked = false
            console.log("task updated")
            console.log("updated task unchecked")
            updateCounters()
        }
    })

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });

  }

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

