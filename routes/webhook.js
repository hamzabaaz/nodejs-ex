var express = require('express'),
    db      = require('../db/db'),
    router  = express.Router();

function bodyParser(req, res, next) {
     var data = '';
     req.on('data', function(chunk){ data += chunk})
     req.on('end', function(){
           req.rawBody = data;
           req.body = JSON.parse(data);
           next();
      });
}

router.post('/record_history', bodyParser, function(req, res) {

       var time, title, url, body;

        body  = req.body;

        db.init(function(d, err){
            if(d) {
              d.collection('history').insert(body, function(err, result){
                 if(err) console.log(err);
                 d.close();
                 res.status(200);
                 res.end();
              });
            } else {
                res.status(500);
                res.end();
            }
        });


});

module.exports = router;
