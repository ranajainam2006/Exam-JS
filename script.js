
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const submitBtn = document.getElementById('submitBtn');

  let editIndex = -1; 

  function loadTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task';
      taskDiv.innerHTML = `
        <h3>${task.title}
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
          <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        </h3>
        <small><strong>Date:</strong> ${task.date}</small><br>
        <small><strong>Priority:</strong> ${task.priority}</small>
        <p>${task.description}</p>
      `;
      taskList.appendChild(taskDiv);
    });
  }

  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    document.getElementById('title').value = task.title;
    document.getElementById('date').value = task.date;
    document.getElementById('priority').value = task.priority;
    document.getElementById('description').value = task.description;

    editIndex = index;
    submitBtn.textContent = 'Update Task';
  }

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;
    const description = document.getElementById('description').value;

    const task = { title, date, priority, description };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (editIndex > -1) {
      tasks[editIndex] = task;
      editIndex = -1;
      submitBtn.textContent = 'Add Task';
    } else {
      tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskForm.reset();
    loadTasks();
  });

  loadTasks();
