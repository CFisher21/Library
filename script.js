// the constructor
function Book(id, author, title, pages, genre, read) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.genre = genre;
  this.read = read;
}

// Adds mock data to local storage & checks to see if it already exists
function addMockData() {
  //Mock data
  (book1 = new Book(
    1,
    "Harper Lee",
    "To Kill a Mockingbird",
    "336",
    "Thriller",
    "No"
  )),
    (book2 = new Book(
      2,
      "F. Scott Fitzgerald",
      "The Great Gatsby",
      "581",
      "Tragedy",
      "No"
    )),
    (book3 = new Book(
      3,
      "George R. R. Martin",
      "A Song of Ice and Fire",
      "804",
      "Fantasy",
      "No"
    )),
    (book4 = new Book(4, "Dr. Seuss", "The Lorax", "61", "Children's", "No"));

  function checkArrayInLocalStorage() {
    // Retrieve array from local storage
    const storedArray = localStorage.getItem("myLibrary");
    //check if array exists
    return storedArray !== null;
  }
  //Handle & log data writing
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

// Grab data from local storage
function getData() {
  return JSON.parse(localStorage.getItem("myLibrary")) || [];
}

function saveData(data) {
  localStorage.setItem("myLibrary", JSON.stringify(data));
}

addMockData();
// Add book to local storage "myLibrary"
function addBookToLibrary(id, author, title, pages, genre, read) {
  
  // Create new book object
  const book = new Book(id, author, title, pages, genre, read);
  
  // Get data from local storage
  let data = getData();

  // Add book to the data from local storage
  data.push(book);

  // Save the data back to local storage
  saveData(data);
}



document.addEventListener("DOMContentLoaded", () => {
  
  // Get form element from HTML
  const form = document.getElementById("form");
  // Get bookedAdded span from HTML
  const bookAdded = document.getElementById("bookAdded");

  // Handle data coming in from form
  form.addEventListener("submit", (event) => {
    // Prevent the default action of the form. Usually tries to send data to server. No server used here.
    event.preventDefault();

    // Orgainzing data coming in from form
    author = document.getElementById("author").value;
    title = document.getElementById("title").value;
    pages = document.getElementById("pages").value;
    genre = document.getElementById("genre").value;
    checked = document.getElementById("read").checked;

    // Handling how the read gets saved. IE.. Saves as "Yes" instead of "True"
    if (checked == true) {
      read = "Yes";
    } else {
      read = "No";
    }

    // Get data from local storage
    data = getData();

    // Increment the id value
    id = data.length + 1;

    // Add book
    addBookToLibrary(id, author, title, pages, genre, read);

    // User feedback on form.
    bookAdded.innerText = "Book Added";

    // Refresh the form
    setTimeout(() => {
      document.getElementById("author").value = "";
      document.getElementById("title").value = "";
      document.getElementById("pages").value = "";
      document.getElementById("genre").value = "";
      document.getElementById("read").value = "";
      bookAdded.innerText = "";
    }, 3000);

    // Refresh the table
    showBooks();
  });

  // Get HTML element/button
  const getBooks = document.getElementById("getBooks");
  // event listener to for button to show books 
  getBooks.addEventListener("click", showBooks);

  // Get HTML table
  const tableBody = document.querySelector("#table tbody");

  // Show the local storage myLibrary on the table
  function showBooks() {
    // Get data from local storage
    const data = getData();

    // Clear the form
    tableBody.innerHTML = "";

    // Add local storage data to the table
    data.forEach((item, index) => {
      // Create row element
      const row = document.createElement("tr");

      // Create td element and add data from local storage to it. Same for following 4 sections.
      const authorCell = document.createElement("td");
      authorCell.textContent = item.author;
      // Add td to the row
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

      // Creates a read button that can update from yes/no both on screen and in storage
      const readCell = document.createElement("td");
      const readButton = document.createElement("button");
      readButton.textContent = item.read;
      readButton.classList.add("toggle-read");
      readButton.addEventListener("click", () => toggleReadStatus(index));
      readCell.appendChild(readButton);
      row.appendChild(readCell);

      // Creates a delete button that finds the index of the data you want to delete & delete the whole thing.
      const deleteCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", () => {
        deleteBook(index);
      });
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);

      // Add row to the table
      tableBody.appendChild(row);
    });
  }

  // Logic for updating the read status on table & in storage
  function toggleReadStatus(index) {
    // Get data from local storage
    let data = getData();
    // check if data exists at the index
    if (data[index]) {
      // Check read value at the index and change value.
      data[index].read = data[index].read === "Yes" ? "No" : "Yes";
      // Save data to local storage
      saveData(data);
      //Refresh the table
      showBooks();
    }
  }
  //Delete book at index;
  function deleteBook(index) {
    // Get data from local storage
    let data = getData();
    // check if data exists
    if (data[index]) {
      // Remove the item at the specified index
      data.splice(index, 1); 
      // Save data to local storage
      saveData(data) 
      // Refresh the table
      showBooks(); 
    }
  }

  // Delete intire local storage library
  // Get button/element from HTML
  const clearLibrary = document.getElementById("delete-library");

  // Add listener for when user clicks on button
  clearLibrary.addEventListener("click", () => {
    // clear the local storage
    localStorage.clear();
    // Send alert to user
    alert("Library has been deleted.");
    //refresh the table
    showBooks();
  });

  
  // get button/element from HTML
  const addToLibrary = document.getElementById("addToLibrary");
  // Get form from HTML
  const formElement = document.getElementsByClassName("form")[0];

  // Toggle a classlist on the form to make it appear and disappear
  addToLibrary.addEventListener("click", () => {
    formElement.classList.toggle("active");
  });
});
