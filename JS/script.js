   const addNewTask = document.getElementById('addNewTask')
   const alertDiv = document.getElementById('alertdiv');
   const saveBtn = document.getElementById('save-btn');
   const taskInput = document.getElementById('taskInput');
   const taskList = document.getElementById('taskList');
   const dispalySetAlert = document.getElementById('set-alarmbtn');
   const alarmInput = document.getElementById('alarmInput');
   const timerPlaceholder = document.getElementById('timer-placeholder');
   const removeAlert = document.getElementById('removeAlert');
   const alertDispaly = document.getElementById('alertDispaly');
   const listDiplay = document.querySelector('.list-diplay');
   const noItem = document.querySelector('.noItem');

   let toDoLists = [];  
function addTask() {
            

            if (taskInput.value.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = taskInput.value;
                taskList.appendChild(li);
                taskInput.value = '';
            }
        }
const displayAddTask = () => {
   addNewTask.style.display = 'block';
}
  
const setAlert = () => {
    alarmInput.style.display='block';
    dispalySetAlert.style.display='block';
    alertDispaly.style.display = 'none';
    taskInput.style.display='none';
    saveBtn.style.display='none';
    alertDiv.style.display='none';
}

const set = () => {
  const settedTime = alarmInput.value ? alarmInput.value : "please set the time";
  timerPlaceholder.textContent = settedTime;
    alertDispaly.style.display = 'block';
    alarmInput.style.display='none';
    dispalySetAlert.style.display='none';
    taskInput.style.display='block';
    saveBtn.style.display='block';
    alertDiv.style.display='block';
    const currentTime = new Date();
}
const removeSettedAlertTime = () =>{
  timerPlaceholder.textContent = " ";
   alertDispaly.style.display = 'none';
}


const closeAddTaskModal = () => {
    addNewTask.style.display = 'none';
    taskInput.value = '';
    alarmInput.value = '';
    timerPlaceholder.textContent = '';
    alertDispaly.style.display = 'none';
    taskInput.style.display = 'block';
    saveBtn.style.display = 'block';
    alertDiv.style.display = 'block';
};

const saveTask = () => {
    const toDoTitle = taskInput.value.trim();
    const alertSetted = alarmInput.value;

    if (!toDoTitle) {
        alert("Please enter a task name!");
        return;
    }

    const inputToDo = { 
        id: Date.now(), 
        name: toDoTitle, 
        alertTime: alertSetted || "No alarm",
        completed: false 
    };

    toDoLists.push(inputToDo);
    renderTasks();
    closeAddTaskModal(); 
};


const toggleTask = (id) => {
    const task = toDoLists.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
};

const renderTasks = () => {
    
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const completedSection = document.querySelector('.completed');

    taskList.innerHTML = ""; 
    completedTaskList.innerHTML = ""; 

    
    const pendingTasks = toDoLists.filter(t => !t.completed);
    const doneTasks = toDoLists.filter(t => t.completed);

    
    if (toDoLists.length > 0) {
        listDiplay.style.display = 'block';
        noItem.style.display = 'none';
    } else {
        listDiplay.style.display = 'none';
        noItem.style.display = 'block';
    }

    
    completedSection.style.display = doneTasks.length > 0 ? 'block' : 'none';

    
    const createLi = (task) => {
        const li = document.createElement("li");
        li.className = "lists"; 
        li.innerHTML = `
            <input type="checkbox" class="checkbox-round" 
                ${task.completed ? 'checked' : ''} 
                onclick="toggleTask(${task.id})">
            <span style="margin-left: 10px; ${task.completed ? 'text-decoration: line-through' : ''}">
                ${task.name} <small>(${task.alertTime})</small>
            </span>
        `;
        return li;
    };

    pendingTasks.forEach(task => taskList.appendChild(createLi(task)));
    doneTasks.forEach(task => completedTaskList.appendChild(createLi(task)));
};