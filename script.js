function Book(id, author, title, pages, genre, read) {
  // the constructor
  this.id = id
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.genre = genre;
  this.read = read;
}

function addMockData() {
    (book1 = new Book(1 ,"Harper Lee", "To Kill a Mockingbird", "336", "Thriller", 'No')),
    (book2 = new Book(2, "F. Scott Fitzgerald", "The Great Gatsby", "581", "Tragedy", 'No')),
    (book3 = new Book( 3,
      "George R. R. Martin",
      "A Song of Ice and Fire",
      "804",
      "Fantasy",
      'No'
    )),
    (book4 = new Book( 4,
      "Dr. Seuss",
      "The Lorax",
      "61",
      "Children",
      'No'
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

function addBookToLibrary(id, author, title, pages, genre, read) {
  const book = new Book(id, author, title, pages, genre, read);

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

    if (checked == true) {
      read = "Yes";
    } else {
      read = "No";
    }

    data = getData();

    id = data.length + 1

    addBookToLibrary(id, author, title, pages, genre, read);

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

    data.forEach((item, index) => {
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
      const readButton = document.createElement("button");
      readButton.textContent = item.read;
      readButton.classList.add('toggle-read');
      readButton.addEventListener("click", () => toggleReadStatus(index));
      readCell.appendChild(readButton);
      row.appendChild(readCell);

      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', () => {
        deleteBook(index);
      })
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);

      tableBody.appendChild(row);
    });
  }

  function toggleReadStatus(index) {
    let data = JSON.parse(localStorage.getItem('myLibrary')) || [];
    if(data[index]) {
      data[index].read = data[index].read === "Yes" ? "No" : "Yes";
      localStorage.setItem('myLibrary', JSON.stringify(data))
      showBooks()
    }
    
  }

  function deleteBook(index) {
    let data = JSON.parse(localStorage.getItem('myLibrary')) || [];
    if (data[index]) {
        data.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem('myLibrary', JSON.stringify(data)); // Update local storage
        showBooks(); // Refresh the display
    }   
  }

  const clearLibrary = document.getElementById('delete-library');

  clearLibrary.addEventListener('click', () => {
    
    localStorage.clear();
    
    alert('Library has been deleted.')

    showBooks();
  })

  

  getBooks.addEventListener("click", showBooks);

  const addToLibrary = document.getElementById("addToLibrary");
  const formElement = document.getElementsByClassName("form")[0];

  addToLibrary.addEventListener("click", () => {
    formElement.classList.toggle("active");
  });

});
