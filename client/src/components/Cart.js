import React, { useState } from 'react'
import { LoginContext } from '../contexts/LoginContext';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Cart = () => {


  let [userAddedData, setuserAddedData] = useState([]);
 

  let [currentUser, err, userLoginStatus, loginUser, logutUser] = useContext(LoginContext)

  let f = async () => {

    const result = {
      username: currentUser.username
    }

    let response = await axios.post("http://localhost:4000/product-api/Cart", result)

    let users = response.data;
    const m = users.user[0].addedUsers;
   
    setuserAddedData(m)
  }
  f()
  
  let onDeleteUser =async(item)=>{
    const result={
      username:currentUser.username,
      deleteUser:item
    }
    console.log("sending in cart",result);
    
    let response = await axios.post("http://localhost:4000/product-api/Cart1", result)
    let finalUsers=response.data.userData[0].addedUsers;
    console.log("in cart is",finalUsers);
    

  }

  return (
    <div>

      
      <div className='container'>
        <div>
        
          { userAddedData.length!=0?
          userAddedData.map((item,index)=>{
            return(
              
              <div className='container'>
                
              <div className="card m-5 width-50">
  
              <div className="card-body  mt-4 text-start ">
              <h5 className="card-title ">{item.name}</h5>
              <p> <b>Email </b> : {item.email}</p>
              <p> <b>Number</b>: {item.phNo}</p>
     
             <button  onClick={()=>onDeleteUser(item)} className="btn btn-danger " >Delete</button>
             <Link  to="/Update"className="btn btn-primary ">Update</Link>
            </div>
             </div>

            </div>
             
             
            )
          }) :<h1>Users list is Empty</h1>
          }
        </div>

      </div>
    </div>
  )
}

export default Cart