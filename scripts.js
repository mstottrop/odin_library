const myLibrary = [];
const showBtn = document.getElementById("showDialog");
const dialog = document.getElementById("dialog");
const closeBtn = document.getElementById("closeBtn");
const bookWrapper = document.querySelector(".bookWrapper");

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

function deleteBooks(cardElement) {
  console.log("Deleting Card: ", cardElement); // Debugging

  if (cardElement && bookWrapper.contains(cardElement)) {
    bookWrapper.removeChild(cardElement);
  } else {
    console.log("The element doesn't exist or has already been removed.");
  }

  const titleOfBook = cardElement.querySelector(".title").textContent;
  const indexOfTitleInArray = myLibrary.findIndex(
    (book) => book.title === titleOfBook
  );
  if (indexOfTitleInArray !== -1) {
    myLibrary.splice(indexOfTitleInArray, 1);
  }
}

function createNewCard(book) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");

  // Create the buttons
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("cardButtons");

  const toggleButton = document.createElement("span");
  toggleButton.classList.add("iconify");
  toggleButton.setAttribute("data-icon", "mdi-toggle-switch-off");

  const deleteButton = document.createElement("span");
  deleteButton.classList.add("iconify");
  deleteButton.setAttribute("data-icon", "mdi-remove-octagon");

  buttonDiv.appendChild(toggleButton);
  buttonDiv.appendChild(deleteButton);
  newCard.appendChild(buttonDiv);

  // add book information
  const titleParagraph = document.createElement("p");
  titleParagraph.classList.add("title");
  titleParagraph.textContent = book.title;

  const authorParagraph = document.createElement("p");
  authorParagraph.classList.add("author");
  authorParagraph.textContent = book.author;

  const pagesParagraph = document.createElement("p");
  pagesParagraph.classList.add("pages");
  pagesParagraph.textContent = book.pages;

  const completionParagraph = document.createElement("p");
  completionParagraph.classList.add("completion");
  completionParagraph.textContent = book.completionStatus;

  newCard.appendChild(titleParagraph);
  newCard.appendChild(authorParagraph);
  newCard.appendChild(pagesParagraph);
  newCard.appendChild(completionParagraph);

  // Add to bookWrapper
  bookWrapper.appendChild(newCard);

  bookWrapper.addEventListener("click", (e) => {
    if (e.target.closest("[data-icon='mdi-remove-octagon']")) {
      console.log(e.target);
      const cardToRemove = e.target.closest(".card");
      deleteBooks(cardToRemove);
    }
  });
}

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateBooks();
  dialog.close();
});

function getInputValue(selector) {
  const input = dialog.querySelector(selector);
  if (!input || input.value.trim() === "") {
    throw new Error(`Field ${selector} must not be empty.`);
  }
  return input.value.trim();
}

function updateBooks() {
  try {
    const titleInput = getInputValue(".titleInput");
    const authorInput = getInputValue(".authorInput");
    const pagesInput = getInputValue(".pagesInput");
    const completionInput = getInputValue(".completionInput");

    const newBook = new Book(
      titleInput,
      authorInput,
      pagesInput,
      completionInput
    );
    myLibrary.push(newBook);
    createNewCard(newBook);
  } catch (error) {
    alert("There was an error: " + error.message);
  }
}
