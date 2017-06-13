// Module to parse json body from request
module.exports = function(req, res, next) {
     var data = '';
     req.on('data', function(chunk){ data += chunk})
     req.on('end', function(){
           req.rawBody = data;
           req.body = JSON.parse(data);
           next();
      });
}