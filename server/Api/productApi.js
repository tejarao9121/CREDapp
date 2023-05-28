const exp=require("express");
const productApp=exp.Router();

const expressAsyncHandler=require('express-async-handler');

const VerifyToken=require("./VerifyToken")




productApp.use(exp.json());
productApp.post("/Cart",expressAsyncHandler(async(request,response)=>{

    const productcollection=request.app.get('productcollection');

    const newUser=request.body;

    let products=await productcollection.find({username:newUser.username}).toArray();
     
    response.status(200).send({message:"user list",user:products});
}))



productApp.use(exp.json());
productApp.post("/AddUser",expressAsyncHandler(async(request,response)=>{
    const productcollection=request.app.get('productcollection');
    const newUser=request.body;
    console.log("in post",newUser);
    let myUsers=await productcollection.findOne({username:newUser.username})  
    if(myUsers!=null){
        const addedUsers=myUsers.addedUsers
       const userdata=newUser.newObj
        
        addedUsers.push(userdata)
        console.log("added users",addedUsers);
        await productcollection.updateOne({username:newUser.username},{$set:{addedUsers:addedUsers}})
    
        response.status(200).send({message:"user added"})

    }
    else{
    response.status(200).send({message:"erro..."})
    }
    
}))


productApp.use(exp.json())
productApp.post("/Cart1",expressAsyncHandler(async(request,response)=>{

    const productcollection=request.app.get('productcollection');

   let newUser = request.body;
   
   console.log("list in delete",newUser);
   let addUsers=await productcollection.find({username:newUser.username}).toArray();
   console.log("the userd",addUsers)
   p=addUsers[0].addedUsers
   console.log("tod ele",p)
   p=p.filter(per=>(per.name!= newUser.deleteUser.name || per.phNo!=newUser.deleteUser.phNo))
   
   console.log("aft deleting ",p);
   
   await productcollection.updateOne({username:newUser.username},{$set:{addedUsers:p}})
   let finalUsers=await productcollection.find({username:newUser.username}).toArray();
   console.log("After updatoing",finalUsers)
   
   response.status(200).send({message:"user deleted",userData:finalUsers})


}))









module.exports=productApp