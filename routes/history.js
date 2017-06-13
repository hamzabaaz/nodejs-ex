var express = require('express'),
    db      = require('../db/db'),
    router  = express.Router();


router.get('/', function(req, res) {

    var history, criteria;

    criteria = {};

    if(req.query && req.query.key) 
        criteria.key = req.query.key;
   

    db.connect(function(d, err){
        if(!d) {
          res.status(500);
          res.end('Something bad happened !');
        } else {
          d.collection('history').find(criteria).sort({datetime: -1}).toArray(function(err, result){
            res.render('history.html', {
              history: result
            })
          });
        }
    });

});

module.exports = router;
