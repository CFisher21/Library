// append books to library
const myLibrary = [

]; 

function Book(author, title, pages, genre, read) {
    // the constructor
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.genre = genre;
    this.read = read; 
}

function addBookToLibrary(author, title, pages, genre, read) {
    // do stuff here    
    const book = new Book(author, title, pages, genre, read)

    myLibrary.push(book)
    
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        author = document.getElementById('author').value;
        title = document.getElementById('title').value;
        pages = document.getElementById('pages').value;
        genre = document.getElementById('genre').value;
        read = document.getElementById('read').value;

        addBookToLibrary(author, title, pages, genre, read);

        console.log(myLibrary)
    })
})



