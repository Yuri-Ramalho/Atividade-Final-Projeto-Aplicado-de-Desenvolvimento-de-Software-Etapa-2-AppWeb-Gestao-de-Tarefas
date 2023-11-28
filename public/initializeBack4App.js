const Parse = require('parse/node');

// Initialize Parse with your App ID and JavaScript Key
Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
Parse.serverURL = 'https://parseapi.back4app.com/';

// Create a default user only if it doesn't exist
const query = new Parse.Query(Parse.User);
query.equalTo('username', 'default_user');
query.first().then((existingUser) => {
  if (!existingUser) {
    // User doesn't exist, create a new one
    const user = new Parse.User();
    user.set('username', 'default_user');
    user.set('password', 'default_password');
    user.set('email', 'default@example.com');
    
    return user.signUp().then((userObj) => {
      console.log('Default User class created', userObj);
      return userObj;
    });
  } else {
    console.log('Default User class already exists', existingUser);
    return existingUser;
  }
}).then((userObj) => {
  // Now create a default task and assign it to the user
  const Task = Parse.Object.extend('Task');
  const task = new Task();
  task.set('title', 'Default Task');
  task.set('description', 'Default Task Description');
  task.set('dueDate', new Date());
  task.set('priority', 'High');
  task.set('category', 'Study');

  // Save the default task
  return task.save();
}).then((taskObj) => {
  console.log('Default Task class created', taskObj);
}).catch((error) => {
  console.error('Error creating Default User or Task class', error);
});
