var mongoose = require('mongoose'),
  	Food = mongoose.model('Food');

exports.get = function(req, res) {
  Food.find({ categoryId : req.params.categoryId }, function(err, data) {
    if (err) 
      return res.status(400).send({
        success: false, 
        results: null,
        message: err
      });
    return res.send({success: true, results: data});
  });
};

exports.getFoodByUser = function(req, res) {
  Food.find({ createBy : req.params.createBy }, function(err, data) {
    if (err) 
      return res.status(400).send({
        success: false, 
        results: null,
        message: err
      });
    return res.send({success: true, results: data});
  });
};

exports.create = function(req, res) {
  console.log(req.user);
  req.body.createBy = req.user.user._id;
  var newFood = new Food(req.body);
  newFood.save(function(err, food) {
    if (err)
     return res.status(400).send({
        success: false, 
        results: null,
        message: err
      });
    return res.send({success: true, results: food});
  });
};

exports.update = function(req, res) {
  console.log(req.body)
  Food.findOneAndUpdate({_id : req.params.foodId}, req.body, {new: true}, function (err, data) {
    if (err) 
      return res.status(400).send({
        success: false, 
        results: null,
        message: err
      });
    return res.send({success: true, results: data});
  });
};

exports.delete = function(req, res) {
  Food.findByIdAndRemove({_id : req.params.foodId}, function (err, data) {
    if (err) 
      return res.status(400).send({
        success: false, 
        results: null,
        message: err
      });
    return res.send({success: true, results: data});
  });
};

//food Detail
exports.getDetail = function(req, res) {
  Food.findOne({ _id : req.params.foodId }, function(err, data) {
    if (err) 
      return res.status(400).send({
        success: false, 
        results: null,
        message: err
      });
    return res.send({success: true, results: data});
  });
};

// updateFavourite
exports.updateFavourite = function(req, res) {
  Food.findOneAndUpdate({_id : req.params.foodId}, req.body, function (err, data) {
    if (err) 
      return res.status(400).send({
        success: false, 
        results: null,
        message: err
      });
    return res.send({success: true, results: data});
  });
};
