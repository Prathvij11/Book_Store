import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import BookList from './pages/BookList'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Addbook from './pages/Addbook'
import Cart from './pages/Cart'
import UpdateBook from './pages/UpdateBook'
import Order from './pages/Order'

const App = () => {

  const myRoute = createBrowserRouter([
    {
      path:'/',
      element: <Layout/>,
      children:[{
        index:true,
        element:<BookList/>
      },{
        path:'signup',
        element: <SignUp/>
      },{
        path:'login',
        element:<Login/>
      },{
        path:'addbook',
        element:<Addbook/>
      },{
        path:'cart',
        element:<Cart/>
      },{
        path:'update/:id',
        element:<UpdateBook/>
      },{
        path:'order',
        element:<Order/>
      }
    ]
    }
  ])


  return <RouterProvider router={myRoute} />
}

export default App