var emerald = require('emerald-core');
var app = process.app = emerald();
app.port = 80;
app.listen();
