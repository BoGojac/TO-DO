function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskList = document.getElementById('taskList');

            if (taskInput.value.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = taskInput.value;
                taskList.appendChild(li);
                taskInput.value = '';
            }
        }
const displayAddTask = () => {
    const addNewTask = document.getElementById('addNewTask').style.display = 'block';
}
    //  const diplayAddTask = document.getElementById('addTaskButton').addEventListener('click', addTask);
    //  const addNewTask = document.getElementById('addNewTask')
    //  diplayAddTask.