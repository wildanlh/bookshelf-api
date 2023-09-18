const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Failed to add the book. Please fill in the book name",
    });

    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Failed to add the book. readPage cannot be greater than pageCount",
    });

    response.code(400);
    return response;
  } else if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Book added successfully",
      data: { bookId: id },
    });

    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Failed to add the book",
    });

    response.code(400);
    return response;
  }
};

const getAllBooksHandler = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);

  return response;
};

module.exports = { addBookHandler };
