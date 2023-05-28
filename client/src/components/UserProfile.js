import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext'
import AddUser from './AddUser';
import { Outlet } from 'react-router-dom';

const UserProfile = () => {

  let [currentUser, err, userLoginStatus, loginUser, logutUser] = useContext(LoginContext)



  return (
    <div>

      <p className='display-4 text-centre text-primary'>Hello </p>


      <ul className='list-inline m-3 p-2'>

        <li className='list-inline-item x'>
          <Link className='x m-3' to='AddUser'>AddUser</Link>
        </li >




        <li className='list-inline-item x '>
          <Link className='x m-3' to='Cart'>Cart</Link>
        </li>


      </ul>


      <Outlet/>




    </div>
  )
}

export default UserProfile
