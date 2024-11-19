import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useShopStore from '../store/shop-store'
import { ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify'
const MainNav = () => {
    const carts = useShopStore(state => state.carts)
    const user = useShopStore(state => state.user)
    const [isOpened, setIsOpened] = useState(false)
    const actionLogout = useShopStore(state => state.actionLogout)

    const handleOpen = () => {
        setIsOpened(!isOpened)
    }

    const handlelogout = () => {
        actionLogout()
        setIsOpened(false)
        toast.success('Logout successfully')
    }

    return (
        <nav className='bg-gradient-to-r shadow-md'>
            <div className='mx-auto px-6 lg:px-10'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo and Links */}
                    <div className='flex items-center gap-8'>
                        <NavLink to="/" className=
                            'text-3xl font-bold text-pink-600 hover:text-pink-800 transition duration-300'>
                            <img src="https://i.imgur.com/Ve0ASrH.png" alt="sdbh" className='h-12 mt-1' />
                        </NavLink>

                        <NavLink to="/" className={({ isActive }) =>
                            isActive
                                ? 'bg-pink-500 text-white px-2 py-2 rounded-lg transition-all duration-500 hover:bg-pink-600'
                                : 'text-lg text-gray-700 transition-all duration-500 hover:text-pink-600'}>
                            Home
                        </NavLink>

                        <NavLink to="/shop" className={({ isActive }) =>
                            isActive
                                ? 'bg-pink-500 text-white px-2 py-2 rounded-lg transition-all duration-500 hover:bg-pink-600'
                                : 'text-lg text-gray-700 transition-all duration-500 hover:text-pink-600'}>
                            Shop
                        </NavLink>

                        <NavLink to="/cart" className={({ isActive }) =>
                            isActive
                                ? 'bg-pink-500 text-white px-2 py-2 rounded-lg transition-all duration-500 hover:bg-pink-600 relative'
                                : 'text-lg text-gray-700 transition-all duration-500 hover:text-pink-600 relative '}>
                            Cart
                            {carts.length > 0 && (
                                <span className='absolute -top-3 -right-5 bg-red-500 text-white text-xs rounded-full px-2 py-1'>
                                    {carts.length}
                                </span>
                            )}
                        </NavLink>
                    </div>

                    {
                        user
                            ? <div className='flex items-center gap-5'>
                                <button className='flex items-center '
                                    onClick={handleOpen}
                                >
                                    <img src="https://i.imgur.com/Ve0ASrH.png" alt="me" className='w-10' />
                                    <ChevronDown size={20} />
                                </button>

                                {
                                    isOpened && (
                                        <div className='absolute top-16 right-0 bg-white shadow-md p-5 rounded-md'>
                                            <div className='flex items-center gap-5'>
                                                <img src="https://i.imgur.com/Ve0ASrH.png" alt="me" className='w-10' />
                                                <div>
                                                    <div className='font-bold'>
                                                        Bigman
                                                    </div>
                                                    <div className='block mt-2'>
                                                        <Link to="/user/history" className='text-sm text-gray-700 hover:text-pink-600 transition duration-200'>
                                                            History
                                                        </Link>
                                                    </div>
                                                    <div className='block'>
                                                        {/* Remove Link wrapper and just use a button */}
                                                        <button
                                                            onClick={handlelogout}
                                                            className='text-sm text-gray-700 hover:text-pink-600 transition duration-200'
                                                        >
                                                            Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            : <div className='flex items-center gap-5'>
                                <NavLink to="/login" className='text-sm text-gray-700 hover:text-pink-600 transition duration-200'>
                                    Login
                                </NavLink>
                                <NavLink to="/register" className='bg-pink-500 text-white rounded-md text-sm p-1  hover:bg-pink-600 transition duration-200'>
                                    Register
                                </NavLink>
                            </div>
                    }
                    {/* User Options */}


                </div>
            </div>
        </nav>
    )
}

export default MainNav
