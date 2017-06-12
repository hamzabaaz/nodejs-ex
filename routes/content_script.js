var express = require('express'),
    fs      = require('fs'),
    jpath   = __dirname + '/../cs/main.js',
    router  = express.Router();

router.get('/main.js', function(req, res) {

    var js  = fs.readFileSync(jpath);

    res.status(200);
    res.end(js);

});

module.exports = router;
