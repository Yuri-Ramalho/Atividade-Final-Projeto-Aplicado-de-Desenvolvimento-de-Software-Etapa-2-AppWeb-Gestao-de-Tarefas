document.addEventListener('DOMContentLoaded', async function () {
  
  Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
  if (!Parse.User.current()) {
    alert('Please log in to view tasks.');
    window.location.href = 'login-page.html'; // Redirect to your login page
    return;
  }

  const taskTableBody = document.getElementById('task-list-body');

  await fetchAndRenderTasks();

  async function fetchAndRenderTasks() {
    try {
      const tasks = await fetchTasks();
      renderTaskList(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async function fetchTasks() {
    const Task = Parse.Object.extend('Task');
    const query = new Parse.Query(Task);
    query.equalTo('user', Parse.User.current());
    return query.find();
  }

  function renderTaskList(tasks) {
    taskTableBody.innerHTML = '';

    tasks.forEach(task => {
      const dueDate = task.get('dueDate');
      const adjustedDueDate = new Date(dueDate.getTime() + dueDate.getTimezoneOffset() * 60 * 1000);
      const formattedDueDate = adjustedDueDate.toLocaleDateString();

      const row = document.createElement('tr');
      row.setAttribute('data-task-id', task.id); // Add this line
      row.innerHTML = `
        <td>${task.get('title')}</td>
        <td>${task.get('description')}</td>
        <td>${formattedDueDate}</td>
        <td>${task.get('priority')}</td>
        <td>${task.get('category')}</td>
        <td>
          <a href="edit-task.html?id=${task.id}" class="btn btn-secondary btn-sm"><i class="fas fa-edit"></i> Edit</a>
          <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')"><i class="fas fa-trash"></i> Delete</button>
        </td>
      `;
      // Add a "Task Completed" button to the action column
      const taskCompletedButton = document.createElement('button');
      taskCompletedButton.classList.add('btn', 'btn-success', 'btn-sm');
      taskCompletedButton.innerText = task.get('completed') ? 'Task Completed ✔️' : 'Task Completed';
      taskCompletedButton.addEventListener('click', function () {
        markTaskAsCompleted(task.id);
      });
      row.querySelector('td:last-child').appendChild(taskCompletedButton);

      taskTableBody.appendChild(row);
    });
  }

  window.deleteTask = async function (taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        const Task = Parse.Object.extend('Task');
        const query = new Parse.Query(Task);
  
        const task = await query.get(taskId);
  
         // Check if the task belongs to the current user before deleting
         if (task.get('user').id === Parse.User.current().id) {
          await task.destroy();
          await fetchAndRenderTasks();
        } else {
          console.error('Cannot delete task: not owned by current user');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  // Add this function to mark a task as completed
  async function markTaskAsCompleted(taskId) {
    try {
      const Task = Parse.Object.extend('Task');
      const query = new Parse.Query(Task);

      const task = await query.get(taskId);

      // Check if the task belongs to the current user before updating
      if (task.get('user').id === Parse.User.current().id) {
        const completed = !task.get('completed');
        task.set('completed', completed);
        await task.save();

        // Toggle a 'completed' class on the task row
        const taskRow = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskRow) {
          taskRow.classList.toggle('completed');
          // Update the "Task Completed" button text
          const taskCompletedButton = taskRow.querySelector('.btn-success');
          taskCompletedButton.innerText = completed ? 'Task Completed ✔️' : 'Task Completed';
        }

        await fetchAndRenderTasks();
      } else {
        console.error('Cannot mark task as completed: not owned by current user');
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  }
});
