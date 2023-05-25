const {nanoid} = require('nanoid');
const books = [];
const store = (req, h) => {
  if (req.payload === null) {
    return h.response({status: 'fail', message: 'Gagal menambahkan buku. Mohon isi form terlebih dahulu!'}).code(400);
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
  }).code(404);
};

const update = (req, h) => {
  const bookId = req.params.bookId;

  if (req.payload === null) {
    return h.response({status: 'fail', message: 'Gagal memperbarui buku. Mohon isi form terlebih dahulu!'}).code(400);
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

  const bookIndex = books.findIndex((book) => book.id === String(bookId));

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'}).code(400);
  }

  if (year === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi tahun terbit buku'}).code(400);
  }

  if (author === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama penulis buku'}).code(400);
  }

  if (summary === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi ringkasan buku'}).code(400);
  }

  if (publisher === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi penerbit buku'}).code(400);
  }

  if (pageCount == undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi total halaman buku'}).code(400);
  }

  if (readPage === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi halaman buku yang sedang dibaca'}).code(400);
  }

  if (reading === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi status buku! true or false?'}).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'}).code(400);
  }

  const finished = pageCount === readPage ? true : false;
  const updatedAt = new Date().toISOString();

  books[bookIndex] = {
    ...books[bookIndex],
    name: name,
    year: year,
    author: author,
    summary: summary,
    publisher: publisher,
    pageCount: pageCount,
    readPage: readPage,
    reading: reading,
    finished: finished,
    updatedAt: updatedAt,
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil memperbarui',
  }).code(200);
};

const destroy = (req, h) => {
  const bookId = req.params.bookId;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  books.splice(index, 1);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
