document.addEventListener('DOMContentLoaded', function() {
  
  Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
  

const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;

  try {

    await Parse.User.requestPasswordReset(email);


    const resetAlert = document.getElementById('resetAlert');
    resetAlert.innerHTML = 'A password reset link has been sent to your email.';
    resetAlert.classList.add('alert-success');
    resetAlert.style.display = 'block';
  } catch (error) {

    console.error('Error during password reset:', error.message);
  }
});
});
