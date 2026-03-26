// --- 1. Element Selectors ---
const addNewTask = document.getElementById('addNewTask');
const alertDiv = document.getElementById('alertdiv');
const saveBtn = document.getElementById('save-btn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const dispalySetAlert = document.getElementById('set-alarmbtn');
const alarmInput = document.getElementById('alarmInput');
const timerPlaceholder = document.getElementById('timer-placeholder');
const alertDispaly = document.getElementById('alertDispaly');
const listDiplay = document.querySelector('.list-diplay');
const noItem = document.querySelector('.noItem');

// --- 2. Data Initialization (Load from LocalStorage) ---
let toDoLists = JSON.parse(localStorage.getItem('myTasks')) || [];

// --- 3. Persistence Helper ---
const syncLocalStorage = () => {
    localStorage.setItem('myTasks', JSON.stringify(toDoLists));
};

// --- 4. Task Management Functions ---
const displayAddTask = () => {
    addNewTask.style.display = 'block';
};

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

const setAlert = () => {
    alarmInput.style.display = 'block';
    dispalySetAlert.style.display = 'block';
    alertDispaly.style.display = 'none';
    taskInput.style.display = 'none';
    saveBtn.style.display = 'none';
    alertDiv.style.display = 'none';
};

const set = () => {
    if (!alarmInput.value) {
        alert("Please select a date and time");
        return;
    }
    timerPlaceholder.textContent = alarmInput.value.replace('T', ' ');
    alertDispaly.style.display = 'block';
    alarmInput.style.display = 'none';
    dispalySetAlert.style.display = 'none';
    taskInput.style.display = 'block';
    saveBtn.style.display = 'block';
    alertDiv.style.display = 'block';
};

const removeSettedAlertTime = () => {
    alarmInput.value = "";
    timerPlaceholder.textContent = "";
    alertDispaly.style.display = 'none';
};

const saveTask = () => {
    const toDoTitle = taskInput.value.trim();
    const alertSetted = alarmInput.value;

    if (!toDoTitle) {
        alert("Please enter a task name!");
        return;
    }

    let countId = toDoLists.length > 0 ? toDoLists[toDoLists.length - 1].id + 1 : 1;

    const inputToDo = {
        id: countId,
        name: toDoTitle,
        alertTime: alertSetted || "No alarm",
        completed: false
    };

    console.log("Saving task:", inputToDo);

    toDoLists.push(inputToDo);
    syncLocalStorage(); // Save to permanent storage
    renderTasks();
    closeAddTaskModal();
};

const toggleTask = (id) => {
    const task = toDoLists.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        syncLocalStorage(); // Save completion state
        const currentSearch = document.getElementById('searchInput').value;
        renderTasks(currentSearch);
    }
};

// --- 5. UI Rendering ---
const renderTasks = (searchTerm = "") => {
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const completedSection = document.querySelector('.completed');
    const searchInputDiv = document.querySelector('.search-input');

    taskList.innerHTML = "";
    completedTaskList.innerHTML = "";

    const filteredList = toDoLists.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pendingTasks = filteredList.filter(t => !t.completed);
    const doneTasks = filteredList.filter(t => t.completed);

    if (toDoLists.length > 0) {
        listDiplay.style.cssText = 'display:flex; justify-content: space-around; gap: 100px; margin: 10px 20px;';
        noItem.style.display = 'none';
        searchInputDiv.style.display = 'flex';
    } else {
        listDiplay.style.display = 'none';
        noItem.style.display = 'block';
        searchInputDiv.style.display = 'none';
    }

    completedSection.style.display = doneTasks.length > 0 ? 'block' : 'none';

    const createLi = (task) => {
        const li = document.createElement("li");
        li.className = "lists";
        const textStyle = task.completed ? 'text-decoration: line-through; opacity: 0.6;' : '';
        const displayTime = (task.alertTime && task.alertTime.includes('T')) 
                            ? task.alertTime.replace('T', ' ') 
                            : task.alertTime;

        li.innerHTML = `
            <input type="checkbox" class="checkbox-round" 
                ${task.completed ? 'checked' : ''} 
                onclick="toggleTask(${task.id})">
            <span style="margin-left: 12px; ${textStyle}">
                ${task.name} <br>
                <small style="font-size: 0.8em; color: #aaa;">${displayTime}</small>
            </span>
        `;
        return li;
    };

    pendingTasks.forEach(task => taskList.appendChild(createLi(task)));
    doneTasks.forEach(task => completedTaskList.appendChild(createLi(task)));
};

const searchTasks = () => {
    const searchValue = document.getElementById('searchInput').value;
    renderTasks(searchValue);
};

// --- 6. Alarm Logic ---
const createAlert = () => {
    setInterval(() => {
        const now = new Date();
        // Shift to local time string matching HTML input format
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        const currentTimeString = now.toISOString().slice(0, 16);

        toDoLists.forEach(task => {
            if (!task.completed && task.alertTime === currentTimeString) {
                alert(`ALARM: Your time for ${task.name.toUpperCase()} is up!`);
                task.alertTime = "Alarm played"; 
                syncLocalStorage(); // Save that the alarm played
                renderTasks(); 
            }
        });
    }, 1000);
};

// --- 7. Initial Run ---
renderTasks();
createAlert();