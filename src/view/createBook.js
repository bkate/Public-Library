pl.view.createBook = {
    setupUserInterface: function() {
        var saveButton = document.forms['Book'].commit;
    //    Load all book objects
        Book.loadAll();
    //    Set an event handler for the save/ submit button
        saveButton.addEventListener("click", pl.view.createBook.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function(){
            Book.saveAll();
        })
    },
    handleSaveButtonClickEvent: function () {

        var formE1 = document.forms['Book'];
        var slot = {
            isbn: formE1.isbn.value,
            title: formE1.title.value,
            year: formE1.year.value
        };
        Book.add(slot);
        formE1.reset();
    }
};