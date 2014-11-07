var NANO_TO_MILLI = 1e-6;
var SECONDS_TO_MILLI = 1e3;

module.exports = function(cb) {
  return metrics.bind(null, cb);
}

function metrics(callback, req, res, next) {
  var start = process.hrtime();

  req.once("end", function() {
    var diff = process.hrtime(start);

    var ms = diff[0] * SECONDS_TO_MILLI + diff[1] * NANO_TO_MILLI;

    callback(ms, req, res);
  });

  next();
}
