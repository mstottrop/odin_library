const myLibrary = [];

function Book(title, author, pages, completionStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completionStatus = completionStatus;
  this.info = function () {
    if (this.completionStatus === true) {
      console.log(
        `${this.title} by ${this.author}, ${this.pages} pages, already read.`
      );
    } else {
      console.log(
        `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`
      );
    }
  };
  return this;
}

function addBookToLibrary() {
  // do stuff here
}
