import './App.css';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from './components/Root';
import Error from './components/Error';
import Help from './components/Help';
import UserProfile from './components/UserProfile';
import Products from './components/Products';
import Cart from './components/Cart';
import AddUser from './components/AddUser';




function App() {
  const x=createBrowserRouter([{
    path:'/',
    element:<Root/>,
    errorElement:<Error/>,
    children:[

      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/Login',
        element:<Login/>,  
        
      },
      {
        path:'/Register',
        element:<Register/>,
        
      },
      {
        path:'/Help',
        element:<Help/>,
        
      },
      {
        path:'/UserProfile',
        element:<UserProfile/>,
        children:[
          {
            path:'AddUser',
            element:<AddUser/>

          },
          {
            path:'Products',
            element:<Products/>
          },
          {
            path:'Cart',
            element:<Cart/>
          }
        ]
      }
    ]

}
])
  return (
    <div className="App">
      <RouterProvider router={x}/>
    </div>
  );
}

export default App;
