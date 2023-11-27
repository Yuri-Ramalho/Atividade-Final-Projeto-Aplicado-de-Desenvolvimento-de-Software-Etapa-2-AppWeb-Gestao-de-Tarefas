window.onload = function() {
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
  
        const currentUser = Parse.User.current();
        const navbarLinks = document.getElementById('navbar-links');
        if (currentUser) {
          let profilePictureUrl = currentUser.get('profilePicture');
          if (!profilePictureUrl) {
            profilePictureUrl = 'default-picture.jpg'; 
          }
          navbarLinks.innerHTML = `
            <div class="btn-group">
              <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="${profilePictureUrl}" alt="Profile Picture" style="width: 50px; height: 50px; border-radius: 50%;"> ${currentUser.getUsername()}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="user-profile.html">Profile</a></li>
                <li><a class="dropdown-item" href="#" id="logout">Logout</a></li>
              </ul>
            </div>
          `;
          document.getElementById('logout').addEventListener('click', function() {
            Parse.User.logOut();
            window.location.href = 'login-page.html';
          });
        } else {
          navbarLinks.innerHTML = `
            <li class="nav-item">
              <a class="nav-link" href="user-registration.html">Sign Up</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="login-page.html">Login</a>
            </li>
          `;
        }
      });
  };
  