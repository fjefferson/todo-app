const restful = require('node-restful');
const mongoose = restful.mongoose;

const schema = new mongoose.Schema({
    description: {type: String, require: true},
    createdAt: {type: Date, require: true, default: Date.now},
    done: {type: Boolean, require: true, default: false},
    doneAt: {type: Date}
});

module.exports = restful.model('Task', schema);