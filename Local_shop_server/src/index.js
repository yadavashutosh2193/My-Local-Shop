const express = require('express');
const cors= require('cors');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const session = require('express-session');
const {userModel, ProductModel, cartProductModel} = require('./conector');
 const port = 8080;
 const session_secret = "ramukaka"
const app = express();
app.use(express.json());
app.set('trust proxy', 1);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(session({
    secret: session_secret,
    cookie: {maxAge: 1*60*60*1000}
}));

const salt = 5;
const IsNullOrUndefined = (val)=> (val === null || val === undefined);
// Signup API
app.post('/signup', async (req, res)=>{
    let user = req.body;
    const Bcryptpassword = bcrypt.hashSync(user.password, salt);
    user.password = Bcryptpassword;
    const ExistUserEmail = await userModel.findOne({CustomerEmailId: user.CustomerEmailId});
    if(!IsNullOrUndefined(ExistUserEmail)){
        res.status(400).send({err:`EmailId ${user.CustomerEmailId} already exist please enter another email`});
        return;
    }
    try{
        const newUser = new userModel(user);
        await newUser.save();
        req.session.UserId = newUser._id;
        res.status(201).send({success: "signed up successfully"});
    }catch(err){
        res.send(err);
    }   
});

// login API
app.post('/login', async (req, res)=>{
    const {CustomerEmailId, password} = req.body;
    const ExistingUser = await userModel.findOne({CustomerEmailId});
    if(IsNullOrUndefined(ExistingUser)){
        res.status(401).send({err: "user Does not exist"});
    }else{
         if(bcrypt.compareSync(password, ExistingUser.password)){
             req.session.UserId = ExistingUser._id;
             res.status(200).send({ success: "Logged in" });
         }else{
            res.status(401).send({ err: "Password is incorrect." });
         }

    }
});

const AuthMiddleWare = (req, res, next)=>{
    if(IsNullOrUndefined(req.session.UserId) || IsNullOrUndefined(req.session)){
        res.status(401).send({err: "not logged in"});
    }else{
        next();
    }
}

app.post("/saveproduct",AuthMiddleWare, async (req, res)=>{
    const product = req.body;
    product.UserId = req.session.UserId;
    const newproduct = new ProductModel(product);
     await newproduct.save();
     res.send(newproduct);
})

app.get('/products', async (req, res)=>{
            const data = await ProductModel.find();
            res.send(data);
});

app.get('/myproducts', AuthMiddleWare, async (req, res)=>{
    const data = await ProductModel.find({UserId: req.session.UserId});
    res.send(data);
});

app.post("/savecartproduct", AuthMiddleWare, async (req, res)=>{
    const product = req.body;
    // const ExistingProduct = await cartProductModel.find({UserId:req.session.UserId, ProductId:product.ProductId});
    // if(IsNullOrUndefined(ExistingProduct)){
       product.UserId = req.session.UserId;
       const newproduct = new cartProductModel(product);
        await newproduct.save();
         res.send(newproduct);
    // }else{
    //     res.sendStatus(201);
    // }
});

app.get('/mycartproducts', AuthMiddleWare, async (req, res)=>{
    const data = await cartProductModel.find({UserId: req.session.UserId});
    res.send(data);
});

app.delete("/deletecartproduct/:id", AuthMiddleWare, async (req, res)=>{
    const productId = req.params.id;
    try{
       const p =  await cartProductModel.deleteOne({_id: productId, UserId: req.session.UserId});
       res.sendStatus(200);
    }catch(err){
        res.sendStatus(404);
    }
});

app.get("/logout", (req, res)=>{
    if(!IsNullOrUndefined(req.session)){
        req.session.destroy(()=>{
            res.sendStatus(200);
        })
    }else{
        res.sendStatus(200);
    }
});

app.get("/userinfo", AuthMiddleWare, async (req, res)=>{
    const user = await userModel.findById({_id: req.session.UserId});
    res.send({CustomerName:user.CustomerName, CustomerEmailId: user.CustomerEmailId});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;