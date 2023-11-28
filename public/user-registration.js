document.addEventListener('DOMContentLoaded', function() {
  
  Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
  const registrationForm = document.getElementById('registrationForm');

  registrationForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      // Get the alert div
      const alertDiv = document.getElementById('alert');
      alertDiv.innerHTML = 'Passwords do not match.';
      alertDiv.classList.add('alert-danger');
      alertDiv.style.display = 'block';
      return;
    }

    try {
      // Query for the user
      const query = new Parse.Query(Parse.User);
      query.equalTo('username', username);
      let user = await query.first();
    
      if (!user) {
        // User doesn't exist, create a new one
        user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
    
        await user.signUp();
        
        // Log out the user after registration
        await Parse.User.logOut();
    
        const alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = 'Registration successful! Please log in.';
        alertDiv.classList.add('alert-success');
        alertDiv.style.display = 'block';
    
        setTimeout(function() {
          window.location.href = 'login-page.html';
        }, 2000);
      } else {
        const alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = 'Username already taken. Please choose a different username.';
        alertDiv.classList.add('alert-warning');
        alertDiv.style.display = 'block';
      }
    
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
    
  });
});
