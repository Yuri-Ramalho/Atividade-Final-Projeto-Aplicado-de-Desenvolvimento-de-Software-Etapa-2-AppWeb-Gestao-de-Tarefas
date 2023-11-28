document.addEventListener('DOMContentLoaded', function() {
  Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Log in the user
      const user = await Parse.User.logIn(email, password);
      // If login is successful, display a welcome message
      const welcomeAlert = document.getElementById('welcomeAlert');
      welcomeAlert.innerHTML = `Welcome, ${user.get('username')}!`;
      welcomeAlert.style.display = 'block';

      // Redirect to dashboard page after 2 seconds
      setTimeout(function() {
        window.location.href = 'dashboard.html';
      }, 2000);
      
    } catch (error) {
      // Get the alert div
      const alertDiv = document.getElementById('alert');
    
      // Clear any existing alert classes and hide the alert
      alertDiv.className = 'alert';
      alertDiv.style.display = 'none';
    
      if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
        // If the username and password combination does not match any user, show an alert
        alertDiv.innerHTML = 'Invalid username or password.';
        alertDiv.classList.add('alert-danger');
      } else {
        // If there's another error, log it to the console
        console.error('Error during login:', error.message);
      }

      // Show the alert div
      alertDiv.style.display = 'block';
    }
  });
});
