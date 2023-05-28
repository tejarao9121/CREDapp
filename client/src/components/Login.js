import React,{useState,useContext,useEffect} from 'react'
import { useForm, } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import './login.css'
import UserProfile from './UserProfile'
import { LoginContext } from '../contexts/LoginContext';


function Login() {


  let [currentUser,err,userLoginStatus,loginUser,logutUser]= useContext(LoginContext);



  let { register, handleSubmit, formState: { errors } } = useForm();



  const addUser = (userObj) => {
    console.log(userObj);
    
    loginUser(userObj)
  }


  const navigate=useNavigate();

  useEffect(()=>{
    if(userLoginStatus==true){
      console.log(err)
       navigate('/UserProfile')

    }
  },[userLoginStatus])
  

  
  return (
    <div className='container'>
      {/* {err!=undefined&&err.length!=0&&<p>Some Error</p>} */}
         { err!=0 && (
        <p className='display-3 text-danger text-centre'>{err}</p>
      )}   
      <h1 className='text-centre'>Login</h1>
      <div>
      
      <form onSubmit={handleSubmit(addUser)}>
        <div className="form-group text-start">
          <label htmlFor="username" className='mt-3 t'>Username:</label>
          <input type="text" id='username' className="form-control mt-2" placeholder="Enter username" {...register("username", { required: true })}></input>

        </div>
        <div className="form-group mt-3 text-start">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control mt-2" id="password" placeholder="Enter password" {...register("password", { required: true })}></input>
        </div>

        <input type='submit' className="btn btn-primary mt-4" value='login' ></input>
      </form>
      </div>
    </div>
  )
}

export default Login;
