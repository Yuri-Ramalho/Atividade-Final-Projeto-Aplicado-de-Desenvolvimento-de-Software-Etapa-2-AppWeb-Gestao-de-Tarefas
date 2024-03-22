document.addEventListener('DOMContentLoaded', async function () {
  Parse.initialize('yArd5jI5uzEul4ob6EsljpN9okK0pzy4ttt994Ky', '7hmaVfjipCJYzGFijg6SqXxpgepy4KfBjmzWkX09');
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
  const currentUser = Parse.User.current();
  if (currentUser) {
    document.getElementById('loggedInUser').innerText = currentUser.getUsername();
    
    try {
      const tasks = await fetchTasks();
      checkDueDates(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
  
  async function fetchTasks() {
    const Task = Parse.Object.extend('Task');
    const query = new Parse.Query(Task);
    return query.find();
  }
 
  function checkDueDates(tasks) {
    let now = new Date();
    tasks.forEach(task => {
      let dueDate = task.get('dueDate');
      let timeDifference = dueDate.getTime() - now.getTime();

      if (timeDifference > 0 && timeDifference < 24 * 60 * 60 * 1000) {
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        alert(task.get('title') + ' is due in ' + days + ' days and ' + hours + ' hours!');
      }
    });
  }
});
