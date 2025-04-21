document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from submitting normally

    // Get the input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user matching the provided email
    const user = users.find(user => user.email === email);

    if (user && user.password === password) {
        // If user found and password matches, login is successful
        // Save the user info in sessionStorage (for session tracking)
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));

        // Redirect to the dashboard or any desired page after successful login
        window.location.href = '../pages/dashboard.html';  // Change this URL to your desired page
    } else {
        // If login fails, show an alert
        alert("Invalid email or password. Please try again.");
    }
});
