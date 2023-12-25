//ui elements
let form = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  constructor() {}
  addToBookList(book) {
    let list = document.querySelector("#book-list");
    let row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href='#' class="delete">X</a></td>`;
    list.appendChild(row);
    //console.log(row);
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  showAlert(message, className) {
    let div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    let form = document.querySelector("#book-form");
    container.insertBefore(div, form); //insert div before form
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteFromBook(target) {
    if (target.hasAttribute("href")) {
      target.parentNode.parentNode.remove(); //parentElement
    }
  }
}

form.addEventListener("submit", newBook);
bookList.addEventListener("click", removeBook);

function newBook(e) {
  let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  let ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all the fields!", "error");
  } else {
    let book = new Book(title, author, isbn);
    ui.addToBookList(book);
    ui.clearFields();
    ui.showAlert("Book added", "success");
  }

  //console.log(book)
  //console.log("hello");
  e.preventDefault();
}

function removeBook(e) { //todo alerts removed when clicked whole added body
  let ui = new UI();
  ui.deleteFromBook(e.target);
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
}
