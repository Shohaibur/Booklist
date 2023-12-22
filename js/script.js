//ui elements
let form = document.querySelector("#book-form");



class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//ui class
class UI {
  constructor() {

  } 
  addToBooklist(book) {
    let list = document.querySelector("#book-list");
    let row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href='#' class="delete">X</a></td>`;

    list.appendChild(row);
    //console.log(row);

  };
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

    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}


//event listeners
form.addEventListener("submit", newBook);

function newBook(e) {
  let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  let ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all the fields!","error");

  } else {
    let book = new Book(title, author, isbn);

    ui.addToBooklist(book);

    ui.clearFields();
    ui.showAlert("Book addded","success");
  };


  //console.log(book)
  //console.log("hello");
  e.preventDefault();
}
