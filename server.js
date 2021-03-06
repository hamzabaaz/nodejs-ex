//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    eps     = require('ejs'),
    morgan  = require('morgan');
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Initilize routes
fs.readdirSync('./routes').forEach(function(file) {
  if (file.substr(-3) == '.js') {
     app.use('/' + file.replace('.js', ''), require('./routes/' + file));
   }
});

// Test routes
app.get('/', function (req, res) {
  res.status(200);
  res.render('index.html', { pageCountMessage : null});
});

// Test routes
app.get('/pagecount', function (req, res) {
  res.status(200);
  res.end();
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
