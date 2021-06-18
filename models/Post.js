const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema({
    owner_name: {
        type: String,
        required: true
    },
    owner_email: {
        type: String,
        required: true
    },
    code_title: {
        type: String,
        required: true
    },
    code_url: {
        type: String,
        required: true
    },
    code_approach: {
        type: String,
        required: true
    },
    code_text: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
});

PostSchema.plugin(mongoosePaginate);
module.exports = Post =  mongoose.model('Post', PostSchema);