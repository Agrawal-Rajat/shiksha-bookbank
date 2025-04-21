document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user) {
      window.location.href = "login.html";
      return;
    }
  
    const form = document.getElementById('uploadForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const title = document.getElementById('bookTitle').value.trim();
      const author = document.getElementById('bookAuthor').value.trim();
      const description = document.getElementById('bookDesc').value.trim();
      const price = document.getElementById('bookPrice').value;
      const coverFile = document.getElementById('bookCover').files[0];
  
      if (!coverFile) {
        alert("Please select a cover image.");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = function () {
        const coverImage = reader.result;
  
        const book = {
          id: Date.now(),
          title,
          author,
          description,
          price,
          coverImage,
          uploadedBy: user.email
        };
  
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
  
        alert("Book uploaded successfully!");
        window.location.href = "marketplace.html";
      };
  
      reader.readAsDataURL(coverFile);
    });
  });
  