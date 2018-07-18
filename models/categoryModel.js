'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  image: {
    type : String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Category', CategorySchema);