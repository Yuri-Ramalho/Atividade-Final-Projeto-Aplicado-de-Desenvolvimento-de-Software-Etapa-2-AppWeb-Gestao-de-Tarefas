document.addEventListener('DOMContentLoaded', async function() {
  Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
  Parse.serverURL = 'https://parseapi.back4app.com/';

  // Fetch tasks from Back4App
  const Task = Parse.Object.extend('Task');
  const query = new Parse.Query(Task);
  query.equalTo('user', Parse.User.current());
  const tasks = await query.find();

  // Prepare data for the chart
  const completedTasks = tasks.filter(task => task.get('completed')).length;
  const incompleteTasks = tasks.length - completedTasks;

  // Create the chart
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed Tasks', 'Incomplete Tasks'],
      datasets: [{
        data: [completedTasks, incompleteTasks],
        backgroundColor: ['#007BFF', '#CCCCCC']
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Task Completion Chart'
      },
      legend: {
        position: 'bottom'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });
});
