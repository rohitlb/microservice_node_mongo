var mongoose = require('mongoose');
var City  = mongoose.model('City');

exports.findClosePlaces = function (req, res) {
  var query = City.find({
        "loc": {
          "$geoNear": {
              "type": "Point",
              "coordinates": [-74.0618632 , 4.6608237],
              "spherical": true,
              "maxDistance": 1
          }
        }
      });
      query.exec(function(err,docs) {
        if (err) throw err;
        res.send({
            success: true,
            pet:{lat:-74.0618632 , lon:4.6608237},
            docs: docs
        });
        console.log('success');
      });
}
