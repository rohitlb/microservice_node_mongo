exports = module.exports = function(app, mongoose) {

  var citySchema = new mongoose.Schema({
    name: { type: String },
    kind: { type: String },
    style: { type: String },
    loc: {
      type: {
        type: "String",
        required: true,
        enum: ['Point', 'LineString', 'Polygon'],
        default: 'Point'
      },coordinates: [Number]
    },
  }, { collection: 'city_json' });
  citySchema.index({ 'loc': '2dsphere' });
  mongoose.model('City', citySchema,'city_json');

};
