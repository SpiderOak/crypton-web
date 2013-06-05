module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/getting-started', function (req, res) {
    res.render('getting-started');
  });

  app.get('/docs', function (req, res) {
    res.render('getting-started');
  });

  app.get('/docs/sessions', function (req, res) {
    res.render('docs/sessions');
  });

  app.get('/docs/containers', function (req, res) {
    res.render('docs/containers');
  });
};
