// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         createProxyMiddleware('/movieapi', {
//             target: 'https://openapi.naver.com',
//             pathRewrite: {
//                 '^/movieapi':''
//             },
//             changeOrigin: true
//         }),
//         createProxyMiddleware('/movieapp', {
//             target: 'https://api.themoviedb.org/3/movie',
//             pathRewrite: {
//                 '^/movieapp':''
//             },
//             changeOrigin: true
//         }),
//         createProxyMiddleware('/moviesearch', {
//             target: 'https://api.themoviedb.org/3/search',
//             pathRewrite: {
//                 '^/moviesearch':''
//             },
//             changeOrigin: true
//         })
//     )

//     /*app.use(
//         createProxyMiddleware('/다른context', {
//             target: 'https://다른호스트',
//             pathRewrite: {
//                 '^/지우려는패스':''
//             },
//             changeOrigin: true
//         })
//     )*/
// }

const { createProxyMiddleware } = require('http-proxy-middleware');

exports.handler = function (event, context, callback) {
  const proxyMovie = createProxyMiddleware('/movieapp', {
    target: 'https://api.themoviedb.org/3/movie',
    pathRewrite: {
      '^/movieapp':''
    },
    changeOrigin: true
  });

  const proxySearch = createProxyMiddleware('/moviesearch', {
    target: 'https://api.themoviedb.org/3/search',
    pathRewrite: {
      '^/moviesearch':''
    },
    changeOrigin: true
  });

  const proxyNaver = createProxyMiddleware('/movieapi', {
    target: 'https://openapi.naver.com',
    pathRewrite: {
      '^/movieapi':''
    },
    changeOrigin: true
  });

  if (event.path.includes('/movieapp')) {
    proxyMovie(event, context, callback);
  } else if (event.path.includes('/moviesearch')) {
    proxySearch(event, context, callback);
  } else if (event.path.includes('/movieapi')) {
    proxyNaver(event, context, callback);
  } else {
    callback(null, {
      statusCode: 404,
      body: 'Not Found'
    });
  }
};

