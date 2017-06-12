var express = require('express'),
    db      = require('../db/db'),
    router  = express.Router();

router.post('/record_history', function(req, res) {

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
