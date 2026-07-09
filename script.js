// ==========================================
// STEP 1 & 2: Data Structure & Initial Setup
// ==========================================
const myLibrary = [];

// Book constructor with unique ID using crypto.randomUUID()
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; 
}

// Function to create a book and push it to the array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Add sample books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);


// ==========================================
// STEP 3: Display Books (Modified for Step 4)
// ==========================================
function displayBooks() {
  const container = document.getElementById("library-container");
  container.innerHTML = ""; 

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card"); 

    // 🚨 NEW: Link the HTML element with the JS object using data-attribute
    card.dataset.id = book.id; 

    // 🚨 NEW: Added a delete button inside the card template
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read" : "Not read yet"}</p>
      <button class="delete-btn">🗑️ Delete</button>
    `;

    // 🚨 NEW: Target the delete button of this specific card and add the event
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      removeBook(book.id); // Call the removal logic passing the unique ID
    });

    container.appendChild(card);
  });
}


// ==========================================
// STEP 4: New Logic - Remove Book Function
// ==========================================
function removeBook(idToDelete) {
  // Find the index of the book inside the array that matches the ID
  const index = myLibrary.findIndex(book => book.id === idToDelete);
  
  // If the book is found, remove it from the array using splice
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  
  // Refresh the screen to show the updated library without the deleted book
  displayBooks(); 
}


// ==========================================
// STEP 5: Form Control & Event Listeners
// ==========================================
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const closeDialogBtn = document.getElementById("close-dialog");
const bookForm = document.getElementById("book-form");

// Open modal
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

// Close modal
closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

// Form submission handler
bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleValue = document.getElementById("title").value;
  const authorValue = document.getElementById("author").value;
  const pagesValue = document.getElementById("pages").value;
  const readValue = document.getElementById("read").checked;

  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
  displayBooks();

  bookForm.reset();
  dialog.close();
});

// Initial render of the sample books
displayBooks();