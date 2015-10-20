function Book(slots) {

    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
}

Book.instances = {};

Book.convertRow2Obj = function(bookRow) {
    return new Book(bookRow);
};

Book.loadAll = function () {
    var i = 0, key = "", keys = [], bookTableString = "",  bookTable = {};
    try {
        if(localStorage["bookTable"]) {
            bookTableString = localStorage["bookTable"];
        }
    }
        catch (e){
            alert("Error when reading from local storage " + e);
        }
    if(bookTableString) {
        bookTable = JSON.parse(bookTableString);
        keys = Object.keys(bookTable);
        console.log(keys.length + "books loaded!");
        for(i = 0; i < keys.length; i++){
            key = keys[i];
            Book.instances[key] = Book.convertRow2Obj(bookTable[key]);
        }
    }
};


Book.saveAll = function() {
    var bookTableString = "", error = false;
    var numberOfBooks = Object.keys(Book.instances).length;

    try {
        bookTableString = JSON.stringify(Book.instances);
        localStorage["bookTable"] = bookTableString;
    } catch (e){
        alert("Error when writing to the local storage : " + e);
        error = true;
    }
    if(!error) {
        console.log(numberOfBooks + " books saved.");
    }
};
Book.add = function(slots) {
    Book.instances[slots.isbn] = new Book(slots);
    console.log("Book " + slots.title + " was added");
};

Book.update = function(slots) {
    var book = Book.instances[slots.isbn];
    var year = parseInt(slots.year);
    if (book.title !== slots.title) book.title = slots.title;
    if (book.year !== slots.year) book.year = year;

    console.log("Book " + slots.title + " was modified.");
};

Book.destroy = function(isbn){
    if(Book.instances[isbn]){
        console.log("Book " + isbn + " deleted");
        delete Book.instances[isbn];
    } else console.log("There is no book with the ISBN " + isbn + " in the database");
};

Book.createTestData = function () {
    Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
    Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999});
    Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
    Book.saveAll();
};

Book.clearAllData = function () {
    if(confirm("Are you sure you want to delete all data on the database")){
        localStorage["bookTable"] = {};
    }

};