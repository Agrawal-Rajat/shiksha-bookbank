document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the logged-in user from sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        // If no logged-in user, redirect to the login page
        window.location.href = "login.html";
        return;
    }

    // Display welcome message
    document.getElementById('welcomeText').textContent = `Welcome, ${loggedInUser.username}!`;

    // Pre-fill profile info in the input fields
    document.getElementById('usernameInput').value = loggedInUser.username;
    document.getElementById('emailInput').value = loggedInUser.email;

    // Load profile picture if it exists
    if (loggedInUser.profilePic) {
        document.getElementById('profilePic').src = loggedInUser.profilePic;
    }

    // Profile picture upload event handler
    document.getElementById('profilePicInput').addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageDataUrl = e.target.result;
                document.getElementById('profilePic').src = imageDataUrl;

                // Update user data with the new profile picture
                updateUserData({ profilePic: imageDataUrl });
            };
            reader.readAsDataURL(file);
        }
    });

    // Save profile changes (username)
    document.getElementById('saveProfile').addEventListener('click', function () {
        const newUsername = document.getElementById('usernameInput').value.trim();
        if (!newUsername) {
            alert("Username cannot be empty.");
            return;
        }

        // Update the user's username
        updateUserData({ username: newUsername });

        alert("Profile updated successfully!");
        // Update the welcome message with the new username
        document.getElementById('welcomeText').textContent = `Welcome, ${newUsername}!`;
    });

    // Logout button event handler
    document.getElementById('logoutButton').addEventListener('click', function () {
        // Clear sessionStorage and redirect to login page
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
});

// Update user data in localStorage and sessionStorage
function updateUserData(updates) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Find the user by email
    const userIndex = users.findIndex(user => user.email === loggedInUser.email);
    if (userIndex !== -1) {
        // Update the user with new data
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('users', JSON.stringify(users));

        // Also update sessionStorage with the new data
        loggedInUser = { ...loggedInUser, ...updates };
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }
}
