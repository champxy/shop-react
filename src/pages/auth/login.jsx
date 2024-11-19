import React, {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify';
import useShopStore from '../../store/shop-store';
import { Link, useNavigate  } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const actionLogin = useShopStore(state => state.actionLogin)
  const user = useShopStore(state => state.user)
  console.log(user)

  const [form, setForm] = useState([
    {
      email: '',
      password: '',
    }
  ])

  const handleChange = (e) => {
    // console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await actionLogin(form)
      // console.log('res', res)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success('Welcome back')
    }catch(error){
      // console.log(error)
      const msg = error.response?.data?.msg
      toast.error(msg)
    }
  }


  const roleRedirect = (role) => {
    if(role === 'admin'){
      navigate('/admin')
    }else{
      navigate(-1)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Login </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Login
          </button>
        </form>
  
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
  
}

export default Login;