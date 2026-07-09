// ==========================================
// STEP 1: Data Structure & Prototype
// ==========================================
const myLibrary = [];

// Book constructor with unique ID
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; 
}

// 🚨 NEW: Add toggleRead function to the Book prototype
Book.prototype.toggleRead = function() {
  this.read = !this.read; // Inverts the boolean value )
};

// Function to create a book and push it to the array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Add sample books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);


// ==========================================
// STEP 2 & 3: Display Books (With Toggle Button)
// ==========================================
function displayBooks() {
  const container = document.getElementById("library-container");
  container.innerHTML = ""; 

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card"); 
    card.dataset.id = book.id; 

    // 🚨 MODIFIED: Status styling classes and Toggle Button added
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> <span class="status-text">${book.read ? "Read" : "Not read yet"}</span></p>
      <div class="card-buttons">
        <button class="toggle-read-btn">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
        <button class="delete-btn">🗑️ Delete</button>
      </div>
    `;

    // Target the delete button
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      removeBook(book.id); 
    });

    // 🚨 NEW: Target the toggle read button
    const toggleReadBtn = card.querySelector(".toggle-read-btn");
    toggleReadBtn.addEventListener("click", () => {
      toggleBookStatus(book.id);
    });

    container.appendChild(card);
  });
}


// ==========================================
// STEP 4 & 5: Core Logic Functions
// ==========================================

// Remove book logic
function removeBook(idToDelete) {
  const index = myLibrary.findIndex(book => book.id === idToDelete);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  displayBooks(); 
}

// 🚨 NEW: Toggle book read status logic
function toggleBookStatus(idToToggle) {
  // Find the actual object inside the library array
  const book = myLibrary.find(book => book.id === idToToggle);
  
  if (book) {
    book.toggleRead(); // Execute the prototype method on the object instance
  }
  
  displayBooks(); // Refresh the DOM view to show the new state
}


// ==========================================
// FORM CONTROL & EVENT LISTENERS
// ==========================================
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const closeDialogBtn = document.getElementById("close-dialog");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

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

// Initial application render
displayBooks();