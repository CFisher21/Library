function Book(author, title, pages, genre, read) {
  // the constructor
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.genre = genre;
  this.read = read;
}

function addMockData() {
  (book1 = new Book("Cody", "The Mountains", "256", "Art & Photography", true)),
    (book2 = new Book("James", "Fastest Racecars", "581", "History", false)),
    (book3 = new Book(
      "Anthony",
      "Fly Fishing",
      "1082",
      "Action & Adventure",
      true
    )),
    (book4 = new Book(
      "Morgan",
      "The Fairy Princess",
      "102",
      "Children",
      false
    ));

  function checkArrayInLocalStorage() {
    // Retrieve array from local storage
    const storedArray = localStorage.getItem("myLibrary");
    //check if array exists
    return storedArray !== null;
  }

  if (checkArrayInLocalStorage()) {
    console.log("Array exists in local storage.");
  } else {
    console.log("Array does not exist in local storage. Adding mock data.");
    localStorage.setItem(
      "myLibrary",
      JSON.stringify([book1, book2, book3, book4])
    );
  }
}

addMockData();

function mockBooks() {}

function addBookToLibrary(author, title, pages, genre, read) {
  const book = new Book(author, title, pages, genre, read);

  let data = JSON.parse(localStorage.getItem("myLibrary")) || [];

  data.push(book);

  localStorage.setItem("myLibrary", JSON.stringify(data));
}

function getData() {
  return JSON.parse(localStorage.getItem("myLibrary")) || [];
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const bookAdded = document.getElementById("bookAdded");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    author = document.getElementById("author").value;
    title = document.getElementById("title").value;
    pages = document.getElementById("pages").value;
    genre = document.getElementById("genre").value;
    checked = document.getElementById("read").checked;

    console.log("checked: ", checked);
    if (checked == true) {
      read = "Yes";
    } else {
      read = "No";
    }

    addBookToLibrary(author, title, pages, genre, read);

    bookAdded.innerText = "Book Added";

    setTimeout(() => {
      document.getElementById("author").value = "";
      document.getElementById("title").value = "";
      document.getElementById("pages").value = "";
      document.getElementById("genre").value = "";
      document.getElementById("read").value = "";
      bookAdded.innerText = "";
    }, 3000);

    console.log(getData());
  });

  const getBooks = document.getElementById("getBooks");
  const tableBody = document.querySelector("#table tbody");

  function showBooks() {
    const data = JSON.parse(localStorage.getItem("myLibrary"));

    tableBody.innerHTML = "";

    data.forEach((item) => {
      const row = document.createElement("tr");

      const authorCell = document.createElement("td");
      authorCell.textContent = item.author;
      row.appendChild(authorCell);

      const titleCell = document.createElement("td");
      titleCell.textContent = item.title;
      row.appendChild(titleCell);

      const pageCell = document.createElement("td");
      pageCell.textContent = item.pages;
      row.appendChild(pageCell);

      const genreCell = document.createElement("td");
      genreCell.textContent = item.genre;
      row.appendChild(genreCell);

      const readCell = document.createElement("td");
      readCell.textContent = item.read;
      row.appendChild(readCell);

      tableBody.appendChild(row);
    });
  }

  getBooks.addEventListener("click", showBooks);

  const addToLibrary = document.getElementById("addToLibrary");
  const formElement = document.getElementsByClassName("form")[0];

  addToLibrary.addEventListener("click", () => {
    formElement.classList.toggle("active");
  });
});
