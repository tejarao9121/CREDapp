import React, { useState } from 'react'
import  { useContext } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form"
import { Outlet } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext'
import {useNavigate} from "react-router-dom"



function AddUser() {

    let { register, handleSubmit, formState: { errors } } = useForm();

    let [currentUser, err, userLoginStatus, loginUser, logutUser] = useContext(LoginContext)
   

    const navigate =useNavigate()


    const addUser = (userObj) => {
    
        const result = {
            username:currentUser.username,
            newObj:userObj
        }
       


        let f=async()=>{
            let response= await axios.post("http://localhost:4000/product-api/AddUser",result)
            let data=response.data
            
            if(data.message=="user added"){
                alert("added succesfully...")
                navigate('/UserProfile/Cart');

             }
             else{
                alert("error in adding user...")
             }
            

      
          }
        
          f()
      
        }

        


    






    return (
        <div className='container'>
            <h1>{currentUser.username}</h1>


            <form onSubmit={handleSubmit(addUser)}>


                <div className="form-group text-start ">
                    <label htmlFor="email" className='mt-3 '>Enter Email:</label>
                    <input type="email" className="form-control mt-2" id='email' {...register("email", { required: true })}></input>


                </div>
                <div className="form-group mt-3 text-start">
                    <label htmlFor="name">Enter name:</label>
                    <input type="text" className="form-control mt-2" id="name" name='name' placeholder="enter name " {...register("name", { required: true })}></input>
                </div>


                <div className="form-group mt-3 text-start">
                    <label htmlFor='phNo'>Enter Number:</label>
                    <input type="text" className="form-control mt-2" id="phNo" placeholder="enter number" name='phNo'{...register("phNo", { required: true })}></input>
                </div>





                <input type="submit" className="btn btn-primary mt-3" value="Add" />
            </form>
            {/* <Outlet /> */}

        </div>
    )

    }
export default AddUser;
