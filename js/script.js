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
  
 static addToBookList(book) {
    let list = document.querySelector("#book-list");
    let row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href='#' class="delete">X</a></td>`;
    list.appendChild(row);
    //console.log(row);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

 static  showAlert(message, className) {
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

 static deleteFromBook(target) {
    if (target.hasAttribute("href")) {
      target.parentNode.parentNode.remove(); //parentElement
      UI.showAlert("Book Removed!", "success");
    }
  }
}

//local storage class
class store{
  static getBooks(){
    let books ;
    if (localStorage.getItem("books")==null){
      books=[];
    }else{
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(books){
    let books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books",JSON.stringify(books));
  }
  static displayBooks(){
    let books = Store.getBooks();

    books.forEach(book=>{
      UI.addToBookList(book);
    });
  }
  
}

//event listener
form.addEventListener("submit", newBook);
bookList.addEventListener("click", removeBook);
document.addEventListener("DOMContentLoaded",Store.displayBooks());

function newBook(e) {
  let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  let ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all the fields!", "error");
  } else {
    let book = new Book(title, author, isbn);
    UI.addToBookList(book);
    UI.clearFields();
    UI.showAlert("Book added", "success");
  }

  //console.log(book)
  //console.log("hello");
  e.preventDefault();
}

function removeBook(e) { //todo alerts removed when clicked whole added body
  
  UI.deleteFromBook(e.target);
  
  e.preventDefault();
}
