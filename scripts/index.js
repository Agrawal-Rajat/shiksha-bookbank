// List of facts related to books
const facts = [
    "📚 The world’s oldest known library was founded in the 7th century BC in Nineveh, Iraq.",
    "📖 The most sold copyrighted book is 'The Lord of the Rings' by J.R.R. Tolkien.",
    "📕 The longest novel ever written is 'In Search of Lost Time' by Marcel Proust—over 9.6 million characters!",
    "📘 There’s a book bound in human skin—'Des destinées de l'âme', located at Harvard!",
    "📗 The first printed book was the Gutenberg Bible in 1455, revolutionizing the spread of knowledge.",
    "📙 A 1,000-page book can take up to 1.5 hours to read aloud without stopping.",
    "📓 The Library of Congress has more than 170 million items in its collection."
  ];
  
  // Function to change the fact
  function changeFact() {
    const factText = document.getElementById("fact-text");
    const randomIndex = Math.floor(Math.random() * facts.length);
    factText.textContent = facts[randomIndex];
  }
  
  // Call once on page load to show an initial random fact
  window.onload = changeFact;
  