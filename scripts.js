const myLibrary = [];
const showBtn = document.getElementById("showDialog");
const dialog = document.getElementById("dialog");
const closeBtn = document.getElementById("closeBtn");
const bookCard = document.querySelector(".card");
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

function displayBooks() {
  const card = document.querySelectorAll(".card");

  if (card.length === myLibrary.length) {
    card.forEach((element, currentIndex) => {
      element.querySelector(".title").textContent =
        myLibrary[currentIndex].title;
      element.querySelector(".author").textContent =
        myLibrary[currentIndex].author;
      element.querySelector(".pages").textContent =
        myLibrary[currentIndex].pages;
      element.querySelector(".completion").textContent =
        myLibrary[currentIndex].completionStatus;
    });
  } else {
    const newBookCard = createNewCard();
    bookWrapper.appendChild(newBookCard);
    displayBooks();
  }
}

function createNewCard() {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  const titleParagraph = document.createElement("p");
  titleParagraph.classList.add("title");
  newCard.appendChild(titleParagraph);
  const authorParagraph = document.createElement("p");
  authorParagraph.classList.add("author");
  newCard.appendChild(authorParagraph);
  const pagesParagraph = document.createElement("p");
  pagesParagraph.classList.add("pages");
  newCard.appendChild(pagesParagraph);
  const completionParagraph = document.createElement("p");
  completionParagraph.classList.add("completion");
  newCard.appendChild(completionParagraph);
  return newCard;
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

    myLibrary.push(
      new Book(titleInput, authorInput, pagesInput, completionInput)
    );
  } catch (error) {
    alert("There was an error: " + error.message);
  }
  if (myLibrary.length > 0) {
    displayBooks();
  } else console.log("nothing to update");
}
