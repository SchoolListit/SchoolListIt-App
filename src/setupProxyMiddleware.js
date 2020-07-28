const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/googleapis',
    createProxyMiddleware({
      target: 'https://maps.googleapis.com',
      changeOrigin: true,
    })
  );
};