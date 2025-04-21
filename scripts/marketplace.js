document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const bookList = document.getElementById('bookList');
  const books = JSON.parse(localStorage.getItem('books')) || [];

  if (books.length === 0) {
    bookList.innerHTML = "<p style='text-align:center;'>No books available yet.</p>";
    return;
  }

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
      <img src="${book.coverImage}" alt="Book Cover">
      <h4>${book.title}</h4>
      <p><strong>By:</strong> ${book.author}</p>
      <p class="description">${book.description}</p>
      <p class="price">₹${book.price}</p>
    `;

    // If user is logged in and is the uploader, show Delete button
    if (user && book.uploadedBy === user.email) {
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-btn';
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', () => {
        const confirmed = confirm(`Are you sure you want to delete "${book.title}"?`);
        if (confirmed) {
          const updatedBooks = books.filter(b => b.id !== book.id);
          localStorage.setItem('books', JSON.stringify(updatedBooks));
          location.reload();
        }
      });

      card.appendChild(deleteButton);
    } else {
      // Show Buy Now button for others (guests or other users)
      const buyButton = document.createElement('button');
      buyButton.className = 'buy-btn';
      buyButton.textContent = 'Buy Now';

      buyButton.addEventListener('click', () => {
        alert(`Thanks for showing interest in buying "${book.title}"!`);
        // You can redirect or show login popup here if needed
      });

      card.appendChild(buyButton);
    }

    bookList.appendChild(card);
  });
});
