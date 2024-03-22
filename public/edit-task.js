document.addEventListener('DOMContentLoaded', async function () {
    Parse.initialize('yArd5jI5uzEul4ob6EsljpN9okK0pzy4ttt994Ky', '7hmaVfjipCJYzGFijg6SqXxpgepy4KfBjmzWkX09');
    Parse.serverURL = 'https://parseapi.back4app.com/';
    
    if (!Parse.User.current()) {
      alert('Please log in to edit tasks.');
      window.location.href = 'login-page.html'; 
      return;
    }
  
    const taskId = getTaskIdFromUrl();
    const task = await fetchTask(taskId);

    document.getElementById('taskTitle').value = task.get('title');
    document.getElementById('taskDescription').value = task.get('description');
    document.getElementById('dueDate').value = task.get('dueDate').toISOString().split('T')[0];
    document.getElementById('priority').value = task.get('priority');
    document.getElementById('category').value = task.get('category');
  
    const editTaskForm = document.getElementById('editTaskForm');
    editTaskForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      await editTask(task);
    });
  
    async function fetchTask(taskId) {
      const Task = Parse.Object.extend('Task');
      const query = new Parse.Query(Task);
      return query.get(taskId);
    }
  
    async function editTask(task) {
      task.set('title', document.getElementById('taskTitle').value);
      task.set('description', document.getElementById('taskDescription').value);
      task.set('dueDate', new Date(document.getElementById('dueDate').value));
      task.set('priority', document.getElementById('priority').value);
      task.set('category', document.getElementById('category').value);
  
      await task.save();
        
      alert('Task edited successfully!');
      window.location.href = 'task-list.html';
    }
  
    function getTaskIdFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('id');
    }
  });
  