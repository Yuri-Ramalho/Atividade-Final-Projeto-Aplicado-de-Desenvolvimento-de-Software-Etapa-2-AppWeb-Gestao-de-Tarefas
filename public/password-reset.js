document.addEventListener('DOMContentLoaded', function() {
  
  Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
  
// Password reset function
const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;

  try {
    // Request password reset
    await Parse.User.requestPasswordReset(email);

    // If request is successful, display a success message
    const resetAlert = document.getElementById('resetAlert');
    resetAlert.innerHTML = 'A password reset link has been sent to your email.';
    resetAlert.classList.add('alert-success');
    resetAlert.style.display = 'block';
  } catch (error) {
    // If there's an error, log it to the console
    console.error('Error during password reset:', error.message);
  }
});
});
