const restful = require('node-restful');
const mongoose = restful.mongoose;

const schema = new mongoose.Schema({
    description: {type: String, require: true},
    done: {type: Boolean, require: true, default: false},
    createdAt: {type: Date, require: true, default: Date.now},
    doneAt: {type: Date}
});

module.exports = restful.model('Todo', schema);