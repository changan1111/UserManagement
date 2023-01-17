const mongoose = require("mongoose")
mongoose.pluralize(null);

const schema = mongoose.Schema({
    name: 'String',
    mobile: 'String'
}, {timestamps:true})

const Post = mongoose.model('Contacts',schema);
module.exports=Post;

