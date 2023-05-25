const {nanoid} = require('nanoid');
const booksArray = [];
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

  booksArray.push(newBook);

  const isSuccess = booksArray.filter((book) => book.id === id).length > 0;

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
//   return h.response({reading: req.query.reading});
  if (req.query.reading === undefined || req.query.reading === null) {
    return h.response({
      status: 'success',
      data: {books: booksArray.map((book) => ({id: book.id, name: book.name, publisher: book.publisher}))},
    }).code(200);
  }

  if (/[0-1]+/.test(req.query.reading)) {
    const reading = req.query.reading == 1 ? true : false;
    const data = booksArray.filter((book) => book.reading == reading);
    return h.response({
      status: 'success',
      data: {books: data.map((book) => ({id: book.id, name: book.name, publisher: book.publisher}))},
    }).code(200);
  }

  if (/[A-Za-z]+/.test(req.query.reading)) {
    return h.response({
      status: 'fail',
      message: 'Gagal menampilkan buku. Gunakan paramater 0 atau 1 untuk menampilkan buku belum atau sudah dibaca.',
    }).code(400);
  }

  if (/^[2-9]$/.test(req.query.reading) || /^-\d+$/.test(req.query.reading) || req.query.reading === '' || /[!@#$%^&*()]/.test(req.query.reading)) {
    return h.response({
      status: 'fail',
      message: 'Gagal menampilkan buku. Gunakan paramater 0 atau 1 untuk menampilkan buku belum atau sudah dibaca.',
    }).code(400);
  }
};

const show = (req, h) => {
  const bookId = req.params.bookId;
  const book = booksArray.filter((book) => book.id === bookId)[0];

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
  const {bookId} = req.params;

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

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();
  const bookIndex = booksArray.findIndex((book) => book.id === bookId);

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  if (bookIndex !== -1) {
    booksArray[bookIndex] = {
      ...booksArray[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const destroy = (req, h) => {
  const bookId = req.params.bookId;

  const bookIndex = booksArray.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  booksArray.splice(index, 1);

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
