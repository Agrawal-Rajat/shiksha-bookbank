// signup.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
  
      if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      // Check if email already exists
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        alert("An account with this email already exists.");
        return;
      }
  
      // Add new user
      const newUser = { username, email, password };
      users.push(newUser);
  
      // Save updated users array
      localStorage.setItem('users', JSON.stringify(users));
  
      alert("Account created successfully!");
  
      // Redirect to login page after success
      window.location.href = "login.html";
    });
  });
  