const mongoose = require("mongoose")
mongoose.pluralize(null);

const schema = mongoose.Schema({
    name: 'String',
    mobile: 'String'
}, {timestamps:true})

const Post = mongoose.model('Movies',schema);
module.exports=Post;

