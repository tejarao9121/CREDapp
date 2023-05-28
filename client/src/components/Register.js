import React, { useState } from 'react'
import './register.css'
import { useForm } from "react-hook-form"
import axios from 'axios';
import {useNavigate} from "react-router-dom"



function Register() {
  let [err,setErr]=useState("")

  //navi
  const navigate =useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm();
  const addUser = (userObj) => {
    let f=async()=>{
      let response= await axios.post("http://localhost:4000/user-api/Register",userObj)
      let data=response.data
      console.log(data,"in register...")
      if(data.message=="user created"){
        navigate('/Login');
      }
      else{
        setErr(data.message)
      }

    }
    // axios
    // .post("http://localhost:4000/user-api/Register",userObj)
    // .then(response=>{
    //   if(response.status===201){
    //     navigate('./Login')
    //   }
    //   if (response.status!==201){
    //     setErr(response.data.message)
    //   }

    // })
    // .catch(err=>{
    //   if(err.response){
    //     setErr(err.message)
    //   }
    //   else if(err.request){
    //     setErr(err.message)
    //   }
    //   else{
    //     setErr(err.message)
    //   }
    f()

  }
  

  return (
    <div>
      <h1>Register</h1>
      <div className='container'>
      { err=="username already exist" && (
        <p className='display-3 text-danger text-centre'>{err}</p>
      )} 
     
        

        <form onSubmit={handleSubmit(addUser)}>
          

           <div className="form-group text-start ">
            <label htmlFor="email" className='mt-3 '>Enter Email:</label>
            <input type="email" className="form-control mt-2" id='email' {...register("email", { required: true })}></input>
            {err.name?.type === "required" && (
              <p className='text-danger fw-blod fs-5'>Email is required</p>
            )}

          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor="username">Username:</label>
            <input type="text" className="form-control mt-2" id="username" name='username' placeholder="username " {...register("username", { required: true })}></input>
          </div>
         
          <div className="form-group mt-3 text-start">
            <label htmlFor="Password">Enter Password:</label>
            <input type="password" className="form-control mt-2" id="Password" name='password'  {...register("password", { required: true })}></input>
          </div>
          <div className="form-group mt-3 text-start">
            <label htmlFor='DOB'>DOB</label>
            <input type="date" className="form-control mt-2" id="DOB" placeholder="DateOfBirth" name='DOB'{...register("DOB", { required: true })}></input>
          </div>

         
            


          <input type="submit" className="btn btn-primary mt-3" value="register" /> 
        </form> 





      </div>

    </div>
  )
}

export default Register
