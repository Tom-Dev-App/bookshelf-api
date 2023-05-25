const {
  store,
  index,
  show,
  update,
  // destroy,
} = require('./controller');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: store,
  },
  {
    method: 'GET',
    path: '/books',
    handler: index,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: show,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: update,
  },
  // {
  //   method: 'DELETE',
  //   path: '/books/{bookId}',
  //   handler: destroy,
  // },
];

module.exports = {
  routes,
};

