let books = [];

//when the add button is clicked, validate inputs then append to global books array
function addBook() {
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const bookDescription = document.getElementById('bookDescription').value;
    const pagesNumber = parseInt(document.getElementById('pagesNumber').value);
    if (bookName && authorName && bookDescription && !isNaN(pagesNumber)) {
        const book = {
            name: bookName,
            authorName: authorName,
            bookDescription: bookDescription,
            pagesNumber: pagesNumber
        };
        books.push(book);
        showBooks();
        clearInputs();
    } else {
        alert('Please fill in all fields correctly.');
    }
}

//function to refresh 'books' div to show contents of books array
function showBooks() {
    const booksDiv = books.map((book, index) => `<h1>book Number: ${index + 1}</h1>
        <p><strong>Book Name: </strong>${book.name}</p>
        <p><strong>Author Name:</strong> ${book.authorName}</p>
        <p><strong>Book Description:</strong> ${book.bookDescription}</p>
        <p><strong>No. of Pages:</strong> ${book.pagesNumber} page(s)</p>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>`
    );
    document.getElementById('books').innerHTML = booksDiv.join('');
}

//this is the onclick function for the edit button created for each book, and accepts the index of the book in the array
//removes the 'edited' book from the list and propigates its data to the text fields
//this is really more of a 'remove and add' than an edit, will always put the edited book at the end of the list, and edited book can be lost if not saved
function editBook(index) {
    const book = books[index];
    document.getElementById('bookName').value = book.name;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('bookDescription').value = book.bookDescription;
    document.getElementById('pagesNumber').value = book.pagesNumber;
    books.splice(index, 1); //remove old entry
    showBooks();
}

//this just clears the input fields once a book has been added or 'edited'
function clearInputs() {
    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('pagesNumber').value = '';
}

//same as the edit function but without populating the input fields
function deleteBook(index){
    books.splice(index, 1); //remove old entry
    showBooks();
}