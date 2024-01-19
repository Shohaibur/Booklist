//ui elements
let form = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");

//create instance of book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  //add new "book" using instance "Book"
 static addToBookList(book) {
  //assign variable list in html Id : book-list
    let list = document.querySelector("#book-list");
    let row = document.createElement("tr"); // Create a new table row element

    // Set the inner HTML of the row with the book's information
    row.innerHTML = `<td>${book.title}</td> 
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href='#' class="delete">X</a></td>`;
    list.appendChild(row);
    //console.log(row);
  }
//clear the values of input fields
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  //display alert message on interface
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

//handle the deletion of a book entry from the user interface
 static deleteFromBook(target) {
    if (target.hasAttribute("href")) { // Check if the target element has an "href" attribute
      target.parentNode.parentNode.remove(); //parentElement
      Store.removeBook(target.parentElement.previousElementSibling.textContent.trim()); //.trim removes white spaces
      UI.showAlert("Book Removed!", "success");
    }
  }
}

//local storage class
class Store{
  static getBooks(){
    let books ;
    //if there is no books [] in local storage , create a books []
    if (localStorage.getItem("books")==null){
      books=[];
    }else{
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book){
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

  static removeBook(isbn) {
    let books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
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

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill all the fields!", "error");
  } else {
    let book = new Book(title, author, isbn);
    UI.addToBookList(book);
    Store.addBook(book); // Add the book to local storage
    UI.clearFields();
    UI.showAlert("Book added", "success");
  }

  e.preventDefault();
}


function removeBook(e) { //todo alerts removed when clicked whole added body
  
  UI.deleteFromBook(e.target);
  
  e.preventDefault();
}
