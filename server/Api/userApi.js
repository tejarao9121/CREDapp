
const exp=require("express");
const userApp=exp.Router();



const bcryptjs=require('bcryptjs');
const jwt=require("jsonwebtoken")

const expressAsyncHandler=require('express-async-handler');


const VerifyToken=require("./VerifyToken")




let users=[];

userApp.get("/get-user",expressAsyncHandler(async(request,response)=>{

    const usercollection=request.app.get('usercollection');

    let users=await usercollection.find().toArray()
    response.status(200).send({message:"user list",payload:users})
    

}))


userApp.get("/get-user/:id",expressAsyncHandler(async(request,response)=>{

    const usercollection=request.app.get('usercollection');
    let userId=(+request.params.id)

    let userObj=await usercollection.findOne({id:userId})


    response.status(200).send({message:"user",payload:userObj})

}))







userApp.use(exp.json());
userApp.post("/Register",expressAsyncHandler(async(request,response)=>{
    const usercollection=request.app.get('usercollection');
    const productcollection=request.app.get('productcollection');


    const newUser=request.body;
    const p= await usercollection.findOne({username:newUser.username})
    if(p===null){
    let hashedPass=await bcryptjs.hash(newUser.password,6)
    newUser.password=hashedPass
    users.push(newUser);

    await usercollection.insertOne(newUser)
    let usernam=newUser.username
    const myUsers={
        username:usernam,
        addedUsers:[]
    }
   
    await productcollection.insertOne(myUsers)

    response.status(201).send({message:"user created"})
    }else{
        response.status(200).send({message:"username already exist"})
    }


}))

userApp.use(exp.json());

userApp.post("/Login",expressAsyncHandler(async(request,response)=>{
    const usercollection=request.app.get('usercollection');


    const logiUser=request.body;
 

    const userOfDb= await usercollection.findOne({username:logiUser.username})
   
    
    if(userOfDb===null){
        response.status(200).send({message:"invalid username"})
    }
    else
    {
        let isEqual=await bcryptjs.compare(logiUser.password,userOfDb.password)
         if(isEqual===false){
            response.status(200).send({message:"invalid password"})
         }
         else{
              let signedToken=jwt.sign({username:userOfDb.username},'abcdef',{expiresIn:4000})

              response.status(200).send({message:"success",token:signedToken,user:logiUser})



         }
    }
   

    

}))





userApp.put("/update-user",expressAsyncHandler( async(request,response)=>{
    const usercollection=request.app.get('usercollection');

    
    const modUser=request.body;
    await usercollection.updateOne({id:modUser.id},{$set:{name:modUser.name}})
    response.status(201).send({message:"user updated"})


        response.status(201).send({message:err.message})





}))
userApp.delete("/delete-user/:id",expressAsyncHandler( async(request,response)=>{
    const usercollection=request.app.get('usercollection');

 
    let userid=(+request.params.id);
    await usercollection.deleteOne({id:userid})
    response.status(201).send({message:"user deleted"})
    
        response.status(201).send({message:err.message})
    

}))


module.exports=userApp;