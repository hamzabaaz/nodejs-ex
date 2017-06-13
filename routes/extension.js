var express = require('express'),
    fs      = require('fs'),
    router  = express.Router();

router.get('/download', function(req, res) {

      var file = fs.createReadStream(__dirname + '/../extension/ext.zip');
      res.setHeader('Content-disposition', 'attachment; filename=e.zip');
      file.pipe(res);

});

module.exports = router;
