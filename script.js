// ==========================================
// STEP 1: Book Blueprint (ES6 Class)
// ==========================================
class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // Prototype methods are now neatly tucked inside the class body
  toggleRead() {
    this.read = !this.read;
  }
}

// ==========================================
// STEP 2: Library Manager (Encapsulating State & Logic)
// ==========================================
class LibraryManager {
  constructor() {
    this.myLibrary = [];
  }

  addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.myLibrary.push(newBook);
  }

  removeBook(idToDelete) {
    this.myLibrary = this.myLibrary.filter(book => book.id !== idToDelete);
  }

  toggleBookStatus(idToToggle) {
    const book = this.myLibrary.find(book => book.id === idToToggle);
    if (book) {
      book.toggleRead();
    }
  }
  
  get books() {
    return [...this.myLibrary]; // Using spread operator to prevent direct mutation from outside
  }
}

// Instantiate our single library orchestrator
const library = new LibraryManager();

// Add sample books for testing
library.addBook("The Hobbit", "J.R.R. Tolkien", 310, true);
library.addBook("1984", "George Orwell", 328, false);


// ==========================================
// STEP 3: DOM Display Controller
// ==========================================
function displayBooks() {
  const container = document.getElementById("library-container");
  container.innerHTML = ""; 

  // Fetch books directly from our manager object
  library.books.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card"); 
    card.dataset.id = book.id; 

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

    // Setup action listeners inside the card
    card.querySelector(".delete-btn").addEventListener("click", () => {
      library.removeBook(book.id);
      displayBooks(); // Refresh UI
    });

    card.querySelector(".toggle-read-btn").addEventListener("click", () => {
      library.toggleBookStatus(book.id);
      displayBooks(); // Refresh UI
    });

    container.appendChild(card);
  });
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

  library.addBook(titleValue, authorValue, pagesValue, readValue);
  displayBooks();

  bookForm.reset();
  dialog.close();
});

// Initial application render
displayBooks();