document.addEventListener('DOMContentLoaded', function() {
  
  Parse.initialize('HrREP8UXPi4ZBhCDpUgLLecqSdvtPeNtM32djPoN', 'nCL56DiXqtnH9SHx2H3WmZe4NILi1PkdnjmvRXuB');
  Parse.serverURL = 'https://parseapi.back4app.com/';

  const profilePicture = document.getElementById('profilePicture');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const changePictureBtn = document.getElementById('changePictureBtn');
  const editUsernameBtn = document.getElementById('editUsernameBtn');
  const editEmailBtn = document.getElementById('editEmailBtn');
  const saveChangesBtn = document.getElementById('saveChangesBtn');

  async function fetchUserProfile() {
    try {
      const currentUser = Parse.User.current();
      if (currentUser) {
        let profilePictureUrl = currentUser.get('profilePicture');
        const username = currentUser.get('username');
        const email = currentUser.get('email');

        // If the user doesn't have a profile picture, use a default picture
        if (!profilePictureUrl) {
          profilePictureUrl = 'default-picture.jpg'; // Replace with your default picture URL
          profilePicture.alt = 'No profile picture. Click "Change Picture" to add one.';
        }

        updateUI(profilePictureUrl, username, email);
      } else {
        // User is not logged in
        alert('Please log in');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  }

  function updateUI(profilePictureUrl, username, email) {
    profilePicture.src = profilePictureUrl;
    usernameInput.value = username;
    emailInput.value = email;
  }

  changePictureBtn.addEventListener('click', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async function(event) {
      const file = event.target.files[0];
      const name = 'photo.jpg';

      const parseFile = new Parse.File(name, file);

      try {
        await parseFile.save();
        const currentUser = Parse.User.current();
        currentUser.set('profilePicture', parseFile.url());
        await currentUser.save();
        profilePicture.src = parseFile.url();
        alert('Profile picture updated successfully!');
      } catch (error) {
        console.error('Error uploading profile picture:', error.message);
      }
    };
    fileInput.click();
  });

  editUsernameBtn.addEventListener('click', function() {
    usernameInput.readOnly = false;
    usernameInput.focus();
  });

  editEmailBtn.addEventListener('click', function() {
    emailInput.readOnly = false;
    emailInput.focus();
  });

  saveChangesBtn.addEventListener('click', async function() {
    try {
      const currentUser = Parse.User.current();
      if (currentUser) {
        currentUser.set('username', usernameInput.value);
        currentUser.set('email', emailInput.value);

        await currentUser.save();
        alert('User profile updated successfully!');
        usernameInput.readOnly = true;
        emailInput.readOnly = true;
      } else {
        // User is not logged in
        alert('Please log in');
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  });

  fetchUserProfile();
});
