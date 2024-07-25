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

    let data = JSON.parse(localStorage.getItem('myLibrary')) || [];

    console.log("Data before push: ", data)

    data.push(book);

    console.log("Data after push: ", data)

    localStorage.setItem('myLibrary', JSON.stringify(data));

    //myLibrary.push(book)
    
}

function getData() {
    return JSON.parse(localStorage.getItem('myLibrary')) || [];
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form');
    const bookAdded = document.getElementById('bookAdded');

    

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        author = document.getElementById('author').value;
        title = document.getElementById('title').value;
        pages = document.getElementById('pages').value;
        genre = document.getElementById('genre').value;
        read = document.getElementById('read').checked;

        addBookToLibrary(author, title, pages, genre, read);

        bookAdded.innerText = 'Book Added'

        

        setTimeout(() => {
            document.getElementById('author').value = '';
            document.getElementById('title').value = '';
            document.getElementById('pages').value = '';
            document.getElementById('genre').value = '';
            document.getElementById('read').value = '';
            bookAdded.innerText = ''
        }, 3000)

        console.log(getData())
    })
})



