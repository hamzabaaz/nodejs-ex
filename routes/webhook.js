var express = require('express'),
    db      = require('../db/db'),
    bp      = require('../modules/bp/bp'),
    router  = express.Router();


router.post('/', bp, function(req, res) {

       var time, title, url, body;

        body  = req.body;

        if(body.type == 'history') {

          delete body.type;

          db.connect(function(d, err){
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

        } else {
          // TODO : Other cases
          res.status(404);
          res.end('Not found');
        }


});

module.exports = router;
