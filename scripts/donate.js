document.addEventListener("DOMContentLoaded", () => {
    const donateForm = document.getElementById("donateForm");
    const bookCards = document.getElementById("bookCards");
  
    // Function to load books from local storage
    function loadBooks() {
      const books = JSON.parse(localStorage.getItem("donatedBooks")) || [];
      bookCards.innerHTML = ""; // Clear the container
  
      if (books.length === 0) {
        bookCards.innerHTML = "<p>No books donated yet. Be the first!</p>";
        return;
      }
  
      books.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.className = "donated-card"; // Ensure this matches the CSS
  
        // If the book has an image, show it
        const bookImage = book.image ? `<img src="${book.image}" alt="Book Image" class="book-image" />` : '';
  
        // Create a delete button
        const deleteButton = `<button class="delete-btn" onclick="deleteBook(${index})">Delete</button>`;
  
        bookCard.innerHTML = `
          ${bookImage}
          <strong>📖 Title:</strong> ${book.title}<br>
          <strong>✍️ Author:</strong> ${book.author}<br>
          <strong>🧑 Donor:</strong> ${book.name}<br>
          ${deleteButton}
        `;
        bookCards.appendChild(bookCard);
      });
    }
  
    // Delete book function
    window.deleteBook = (index) => {
      const books = JSON.parse(localStorage.getItem("donatedBooks")) || [];
      books.splice(index, 1); // Remove the book at the specified index
      localStorage.setItem("donatedBooks", JSON.stringify(books)); // Save updated list to local storage
      loadBooks(); // Reload the books after deletion
    };
  
    // Handle form submission for donating a book
    donateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("donorName").value.trim();
      const title = document.getElementById("bookTitle").value.trim();
      const author = document.getElementById("bookAuthor").value.trim();
      const bookImage = document.getElementById("bookImage").files[0]; // Get the uploaded file
  
      if (!name || !title || !author) return alert("Please fill out all fields.");
  
      let imageBase64 = "";
      if (bookImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          imageBase64 = reader.result;
  
          const newBook = { name, title, author, image: imageBase64 };
          const books = JSON.parse(localStorage.getItem("donatedBooks")) || [];
          books.push(newBook);
          localStorage.setItem("donatedBooks", JSON.stringify(books));
  
          donateForm.reset();
          loadBooks(); // Reload the books after donation
        };
        reader.readAsDataURL(bookImage); // Convert image to base64
      } else {
        const newBook = { name, title, author, image: null };
        const books = JSON.parse(localStorage.getItem("donatedBooks")) || [];
        books.push(newBook);
        localStorage.setItem("donatedBooks", JSON.stringify(books));
  
        donateForm.reset();
        loadBooks(); // Reload the books after donation
      }
    });
  
    loadBooks(); // Initial load when the page is first loaded
  });
  