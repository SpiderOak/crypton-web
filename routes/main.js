module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/getting-started', function (req, res) {
    res.render('getting-started');
  });

  app.get('/developer-guide', function (req, res) {
    res.render('developer-guide');
  });

  app.get('/documentation', function (req, res) {
    res.render('documentation');
  });

  app.get('/examples', function (req, res) {
    res.render('examples');
  });

  app.get('/docs', function (req, res) {
    res.render('getting-started');
  });

  app.get('/docs/accounts', function (req, res) {
    res.render('docs/accounts');
  });

  app.get('/docs/containers', function (req, res) {
    res.render('docs/containers');
  });

};
