const express = require("express");
const {v4: uuidv4} = require("uuid");


const app = express();


app.use(express.static("public"));
app.use(express.json());

// Database
const bookDataBase = [];


// get root route
app.get("/", function (req, res) {
      res.sendFile(__dirname + "/public/index.html");
});


// GET/books to get all books from database
app.get("/books", function (req, res) {
      res.json(bookDataBase);
});

// POST/books to add a book in database
app.post("/books", (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
   res.json({ errormessage: "Title and Author are required." });
  }else{
   const newBook = {
    id: uuidv4(), // generate unique id
    title,
    author,
    publishedDate: publishedDate || "don't have the information",
  };

  bookDataBase.push(newBook);

  res.json(newBook);

  }


});

// DELETE/books/:id  remove a book from the database
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const index = bookDataBase.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return res.json({ message: "Book not found." });
  }

  const deleteBook = bookDataBase.splice(index, 1);

  res.json({ message: "Book deleted successfully.", deleteBook });
});

app.listen(3000, function () {
      console.log("Server is running on port 3000");
});




