const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type : String,
        required: true
    },
    ImageSrc:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required : true
    },
    Type:{
        type: String,
        required: false,
        default: "Miscellaneous"
    },
    flag:{
       type: Boolean,
       default: false,
       reuiured: true
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ProductLocatioin:{
        Latitude:{
            type: Number,
            required: false
        },
        Longitude:{
            type: Number,
            required: false
        },
        FullAddress:{
            type: String,
             required: false
        }
    },
    DiliveryDistance:{
        type: Number,
        default: 3,
        required: false
    }
});
const UserSchema = new mongoose.Schema({
    CustomerName:{
        type: String,
        requuired: true
    },
    CustomerEmailId:{
        type: String,
        required: true
    },
   password:{
       type: String,
       reuiured: true
   },
   SecurityQuestion:{
         type: String,
         reuiured: true
   },
   SecurityAnswer:{
       type: String,
       required: true
   }

});

const cartProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type : String,
        required: true
    },
    ImageSrc:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required : true
    },
    flag:{
       type: Boolean,
       default: false,
       reuiured: true
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ProductId:{
           type: mongoose.Schema.Types.ObjectId,
           required: true
    },
    ProductLocatioin:{
        Latitude:{
            type: Number,
            required: false
        },
        Longitude:{
            type: Number,
            required: false
        },
        FullAddress:{
            type: String,
             required: false
        }
    },
    DiliveryDistance:{
        type: Number,
        default: 3,
        required: false
    }
});

exports.ProductSchema = ProductSchema;
exports.UserSchema = UserSchema;
exports.cartProductSchema = cartProductSchema;