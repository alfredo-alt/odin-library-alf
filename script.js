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
// FORM VALIDATION
// ==========================================
// Single Responsibility: this function ONLY checks whether a field has
// content and displays/clears its custom error message. It doesn't know
// anything about books or the library -- it just validates one input.
function validateRequiredField(input, errorElement, message) {
  if (!input.value.trim()) {
    errorElement.textContent = message;
    input.classList.add('input-error');
    return false;
  }

  errorElement.textContent = '';
  input.classList.remove('input-error');
  return true;
}

function validateBookForm(titleInput, authorInput, pagesInput) {
  // Note: we deliberately don't short-circuit with && here -- we want ALL
  // three fields checked (and their error messages shown) in one pass,
  // not just the first one that fails.
  const isTitleValid = validateRequiredField(
    titleInput,
    document.getElementById('title-error'),
    'The title must be filled!'
  );
  const isAuthorValid = validateRequiredField(
    authorInput,
    document.getElementById('author-error'),
    'The author name must be filled!'
  );
  const isPagesValid = validateRequiredField(
    pagesInput,
    document.getElementById('pages-error'),
    'The number of pages must be filled!'
  );

  return isTitleValid && isAuthorValid && isPagesValid;
}

// ==========================================
// FORM CONTROL & EVENT LISTENERS
// ==========================================
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const closeDialogBtn = document.getElementById("close-dialog");
const bookForm = document.getElementById("book-form");

function clearValidationErrors() {
  document.querySelectorAll('.error-message').forEach((el) => (el.textContent = ''));
  document.querySelectorAll('.input-error').forEach((el) => el.classList.remove('input-error'));
}

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  bookForm.reset();
  clearValidationErrors();
  dialog.close();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readValue = document.getElementById("read").checked;

  const isFormValid = validateBookForm(titleInput, authorInput, pagesInput);
  if (!isFormValid) {
    return; // stop here -- error messages are already showing
  }

  library.addBook(titleInput.value, authorInput.value, pagesInput.value, readValue);
  displayBooks();

  bookForm.reset();
  dialog.close();
});

// Initial application render
displayBooks();