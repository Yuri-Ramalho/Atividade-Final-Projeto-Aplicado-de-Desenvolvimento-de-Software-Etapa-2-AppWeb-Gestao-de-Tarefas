document.addEventListener('DOMContentLoaded', async function () {
  
  Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
  Parse.serverURL = 'https://parseapi.back4app.com/';

   // Check if user is logged in
   if (!Parse.User.current()) {
    alert('Please log in before adding a task.');
    window.location.href = 'login-page.html';
    return;
  }

  const addTaskForm = document.getElementById('addTaskForm');

  addTaskForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    await addTask();
  });

  async function addTask() {
    try {
      const Task = Parse.Object.extend('Task');
      const task = new Task();
  
      const taskTitle = document.getElementById('taskTitle').value;
      const taskDescription = document.getElementById('taskDescription').value;
      const dueDate = new Date(document.getElementById('dueDate').value);
      const priority = document.getElementById('priority').value;
      const category = document.getElementById('category').value;

      task.set('title', taskTitle);
      task.set('description', taskDescription);
      task.set('dueDate', dueDate);
      task.set('priority', priority);
      task.set('category', category);
      task.set('user', Parse.User.current());
      task.set('completed', false);

      await task.save();
  
      addTaskForm.reset();

      
      showAlert('Task added successfully');
      setTimeout(function(){ window.location.href = 'task-list.html'; }, 2000);
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred';
      showAlert('Error adding task: ' + errorMessage, 'danger');
    }
  }

  function showAlert(message, category='success') {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const alertBox = `<div class="alert alert-${category} alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
    alertPlaceholder.innerHTML = alertBox;
  }
});