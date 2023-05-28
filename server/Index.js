const exp =require("express");
const app=exp()



app.listen(4000,()=>{
    console.log("server is porting");
})

const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});





const mclient=require('mongodb').MongoClient;

mclient.connect('mongodb://127.0.0.1:27017/sampledb')
.then(dbRef=>{
   
    let dbobj=dbRef.db('sampledb')
    
    let usercollection=dbobj.collection("usercollection")
    let productcollection=dbobj.collection("productcollection")
    let cartcollection=dbobj.collection("cartcollection");

    app.set("usercollection",usercollection)
    app.set("productcollection",productcollection)
    app.set("cartcollection",cartcollection)
   
    console.log("connected successfully to db")
    
})
.catch(err=>console.log("database connection err is",err))

app.get('/check',(req,res)=>{
    res.send({message:"checking...."})
})

const userApp=require("./Api/userApi");
const productApp=require("./Api/productApi");
const cartApp=require("./Api/cartApi");

app.use("/user-api",userApp);
app.use("/product-api",productApp);
app.use("/cart-api",cartApp);







const invaildPathHandlingMiddleware=(request,response,next)=>{
    response.send({message:"invalid path"});

};
app.use(invaildPathHandlingMiddleware);


const errHandler=(error,request,response,next)=>{
    response.send({"error-message: ":error.message})

}
app.use(errHandler);