let mongoose = require('mongoose');
const {ProductSchema, UserSchema, cartProductSchema} = require('./Schema');

const mongoURI = "mongodb+srv://mylocalshop:local@mylocalshop.gbjpj.mongodb.net/mylocalshop?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });

 collection_connection = mongoose.model('product', ProductSchema);
 collection_connection_user = mongoose.model('user', UserSchema);
 collection_connection_cart = mongoose.model('cartproduct', cartProductSchema);
// const ProductModel = db.model('product', ProductSchema);
// const userModel = db.model('user', UserSchema);


exports.ProductModel = collection_connection;
exports.userModel = collection_connection_user;
exports.cartProductModel = collection_connection_cart;