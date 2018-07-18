var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Food Schema
 */
var CommentSchema = new Schema({
  username: {
    type: String
  },
  foodId: {
  	type : Schema.Types.ObjectId, ref : 'Food'
  },
  content: {
    type: String
  },
  image: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Comment', CommentSchema);
