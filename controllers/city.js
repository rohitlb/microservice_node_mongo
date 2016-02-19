var mongoose = require('mongoose');
var City  = mongoose.model('City');
var Pet  = mongoose.model('Pet');

exports.findClosePlaces = function (req, res) {
  Pet.findOne({
      id_mascota: req.params.pet
  }, function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                message: 'not found'
            });
        } else {
            var query = City.find({
              "loc": {
                "$geoNear": {
                    "type": "Point",
                    "coordinates": response.loc.coordinates,
                    "spherical": true,
                    "maxDistance": 1
                }
              }
            });
            query.exec(function(err,docs) {
              if (err) throw err;
              res.send({
                  success: true,
                  pet:response,
                  docs: docs
              });
              console.log('success');
            });
        }
  });
}
