const {nanoid} = require('nanoid');
const books = [];
const store = (req, h) => {
  if (req.payload === null) {
    return h.response({status: 'fail', message: 'Gagal menambahkan buku. Mohon isi form dengan benar!'});
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'}).code(400);
  }

  if (year === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi tahun terbit buku'}).code(400);
  }

  if (author === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama penulis buku'}).code(400);
  }

  if (summary === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi ringkasan buku'}).code(400);
  }

  if (publisher === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi penerbit buku'}).code(400);
  }

  if (pageCount == undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi total halaman buku'}).code(400);
  }

  if (readPage === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi halaman buku yang sedang dibaca'}).code(400);
  }

  if (reading === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi status buku! true or false?'}).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'}).code(400);
  }

  const finished = pageCount === readPage ? true : false;

  const newBook = {
    id: id,
    name: name,
    year: year, author: author, summary: summary, publisher: publisher, pageCount: pageCount, readPage: readPage, finished: finished, reading: reading, insertedAt: insertedAt, updatedAt: updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }
  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};


const index = (req, h) => {
  return h.response({
    status: 'success',
    data: books,
  });
};

const show = (req, h) => {
  const bookId = req.params.bookId;
  const book = books.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {book}}).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
};

module.exports = {
  store,
  index,
  show,
  // update,
  // destroy,
};
