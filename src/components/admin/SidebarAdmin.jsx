import React from 'react'
import { NavLink } from 'react-router-dom'
import { AlignStartVertical,PencilOff,ChartBarStacked,Box,ShoppingBasket ,LogOut    } from 'lucide-react';
import useShopStore from '../../store/shop-store';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SidebarAdmin = () => {
    const actionLogout = useShopStore(state => state.actionLogout)
    const navigate = useNavigate()
    const handleLogout = () => {
        actionLogout()
        toast.success('Logout successfully')
        navigate('/')
    }

    return (
        <div className='bg-black w-64 text-white flex flex-col h-screen'>
            <div className='h-24 bg-gray-900 flex items-center justify-center text-3xl font bold'>
                Admin Panal
            </div>

            <nav className='flex-1 px-2 py-4 space-y-2  '>
                <NavLink
                to='/admin'
                end
                className={({isActive})=>
                isActive ? 'bg-gray-900 px-4 py-2 rounded-md text-red-500 hover:bg-red-300 flex '
                 : 'text-gray-300 px-4 py-2 hover:bg-gray-900 flex  rounded'
                }
                >
                <AlignStartVertical className='mr-2' />
                    Dashboard
                </NavLink>
                <NavLink
                to='manage'
                className={({isActive})=>
                isActive ? 'bg-gray-900 px-4 py-2 rounded-md text-red-500 hover:bg-red-300 flex '
                 : 'text-gray-300 px-4 py-2 hover:bg-gray-900 flex  rounded'
                }
                >
                <PencilOff className='mr-2 ' />
                    Manage
                </NavLink>
                <NavLink
                to='category'
                className={({isActive})=>
                isActive ? 'bg-gray-900 px-4 py-2 rounded-md text-red-500 hover:bg-red-300 flex '
                 : 'text-gray-300 px-4 py-2 hover:bg-gray-900 flex  rounded'
                }
                >
                <ChartBarStacked  className='mr-2' />
                    Category
                </NavLink>
                <NavLink
                to='product'
                className={({isActive})=>
                isActive ? 'bg-gray-900 px-4 py-2 rounded-md text-red-500 hover:bg-red-300 flex '
                 : 'text-gray-300 px-4 py-2 hover:bg-gray-900 flex  rounded'
                }
                >
                <Box className='mr-2' />
                    Product
                </NavLink>
                <NavLink
                to='orders'
                className={({isActive})=>
                isActive ? 'bg-gray-900 px-4 py-2 rounded-md text-red-500 hover:bg-red-300 flex '
                 : 'text-gray-300 px-4 py-2 hover:bg-gray-900 flex  rounded'
                }
                >
                <ShoppingBasket className='mr-2' />
                    Orders
                </NavLink>
            </nav>

            <div>
            <NavLink
                onClick={handleLogout}
                className={({isActive})=>
                isActive ? 'bg-gray-900 px-4 py-2 rounded-md text-red-500 hover:bg-red-300 flex '
                 : 'text-gray-300 px-4 py-2 hover:bg-gray-900 flex  rounded'
                }
                >
                <LogOut  className='mr-2' />
                    Logout
                </NavLink>
            </div>

        </div>
    )
}

export default SidebarAdmin