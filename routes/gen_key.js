var express = require('express'),
    db      = require('../db/db'),
    bp      = require('../modules/bp/bp'),
    router  = express.Router();


router.post('/', bp, function(req, res) {

    var key, os, agent, body;

    body  = req.body;
    os    = body && body.os ? body.os : '';
    agent = body && body.agent ? body.agent : '';

    function rd(length) {
        var mask = '', result = '';
        mask += 'abcdefghijklmnopqrstuvwxyz';
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        mask += '0123456789';
        for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
        return result;
    }

    db.connect(function(d, err){
        if(!d) {
          res.status(500);
          res.end('Something bad happened !');
        } else {
          key = rd(12);
          d.collection('keys').insert({key: key, os: os, agent: agent, created: new Date().toLocaleString()}, function(err, result){
              if(err) {
                console.log(err);
                res.status(500);
                res.end('Something bad happened');
              } else {
                res.status(200);
                res.json({
                  key: key
                })
              }
          });
        }
    });

});

module.exports = router;
