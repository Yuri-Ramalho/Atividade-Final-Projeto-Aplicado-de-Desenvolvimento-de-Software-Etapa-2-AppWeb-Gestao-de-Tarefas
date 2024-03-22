document.addEventListener('DOMContentLoaded', async function() {
    Parse.initialize('yArd5jI5uzEul4ob6EsljpN9okK0pzy4ttt994Ky', '7hmaVfjipCJYzGFijg6SqXxpgepy4KfBjmzWkX09');
    Parse.serverURL = 'https://parseapi.back4app.com/';


  const Task = Parse.Object.extend('Task');
  const query = new Parse.Query(Task);
  query.equalTo('user', Parse.User.current());
  const tasks = await query.find();


  const completedTasks = tasks.filter(task => task.get('completed')).length;
  const incompleteTasks = tasks.length - completedTasks;


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
