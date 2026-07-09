const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; 
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Add 2 new books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);


function displayBooks() {
  const container = document.getElementById("library-container");
  
  // Clean container to don´t do it again
  container.innerHTML = ""; 

  // Show each book of the array
  myLibrary.forEach((book) => {

    const card = document.createElement("div");
    card.classList.add("book-card"); 

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>State:</strong> ${book.read ? "Read" : "Unread"}</p>
    `;

    container.appendChild(card);
  });
}

displayBooks();

// Seleccionamos los elementos del DOM que necesitamos
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const closeDialogBtn = document.getElementById("close-dialog");
const bookForm = document.getElementById("book-form");

// 1. Cuando el usuario hace clic en "Nuevo Libro", mostramos el modal
newBookBtn.addEventListener("click", () => {
  dialog.showModal(); // Método nativo de la etiqueta <dialog>
});

// 2. Cuando el usuario hace clic en "Cancelar", cerramos el modal
closeDialogBtn.addEventListener("click", () => {
  dialog.close(); // Método nativo para cerrar
});

// 3. Capturamos el momento en que el usuario envía (submit) el formulario
bookForm.addEventListener("submit", (event) => {
  // 🚨 ¡REQUISITO CLAVE! Evitamos que la página se recargue automáticamente
  event.preventDefault();

  // Recogemos los valores que el usuario escribió en los inputs
  const titleValue = document.getElementById("title").value;
  const authorValue = document.getElementById("author").value;
  const pagesValue = document.getElementById("pages").value;
  const readValue = document.getElementById("read").checked; // Da true si está marcado, false si no

  // Enviamos estos datos a nuestra función del Paso 1 para crear el objeto y meterlo al array
  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);

  // Volvemos a ejecutar la función del Paso 2 para redibujar la pantalla con el nuevo libro
  displayBooks();

  // Limpiamos los campos del formulario para que queden vacíos la próxima vez
  bookForm.reset();

  // Cerramos la ventana emergente automáticamente
  dialog.close();
});