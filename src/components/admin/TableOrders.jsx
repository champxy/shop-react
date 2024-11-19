import React, { useEffect, useState } from 'react'
import { getOrdersbyAdmin,updateOrderStatus } from '../../api/Admin'
import useShopStore from '../../store/shop-store'
import { Numberformat } from '../../utils/number'
import { ThaiformatDate } from '../../utils/date'



const TableOrders = () => {
    const token = useShopStore(state => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders(token)
    }, [])

    const getOrders = async (token) => {
        try {
            const res = await getOrdersbyAdmin(token)
            // console.log(res.data.orders)
            setOrders(res.data.orders)
        } catch (error) {
            console.log(error)
        }
    }   

        const handleupdatestatus = async (orderId, status) => {
            console.log(orderId, status)
            const form = { orderId : orderId, orderStatus : status }
            try {
                const res = await updateOrderStatus(form, token)
                
                // console.log(res.data)
                getOrders(token)
            } catch (error) {
                console.log(error)
            }
        }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
                {/* Title */}
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Orders</h1>

                {/* Orders Table */}
                    <table className="w-full mt-5 bg-white rounded-lg shadow-md overflow-hidden">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="py-3 px-4 font-semibold">No.</th>
                                <th className="py-3 px-4 font-semibold text-left ">User</th>
                                <th className="py-3 px-4 font-semibold text-left">Date Ordered</th>
                                <th className="py-3 px-4 font-semibold">Product</th>
                                <th className="py-3 px-4 font-semibold">Summary</th>
                                <th className="py-3 px-4 font-semibold">Status</th>
                                <th className="py-3 px-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                    <tbody>
                        {orders?.map((order, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-4 px-4 text-center text-gray-600">{index + 1}</td>
                                <td className="py-4 px-4 text-gray-700">
                                    <p className="font-medium">{order.orderedBy.email}</p>
                                    <p className="text-sm text-gray-500">{order.orderedBy.address}</p>
                                </td>
                                <td className="py-4 px-4 text-gray-700">{ThaiformatDate(order.createdAt)}</td>
                                <td className="py-4 px-4">
                                    <ul>
                                        {order.products?.map((product, index) => (
                                            <li key={index} className="flex flex-col gap-1">
                                                <p className="font-medium text-gray-700">{product.product.title}</p>
                                                <span className="text-sm text-gray-500">
                                                    {product.count} x ฿{Numberformat(product.product.price)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="py-4 px-4 text-center font-medium text-gray-700">฿{Numberformat(order.cartTotal)}</td>
                                <td className="py-4 px-4 text-center">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            order.orderStatus === "Not Process"
                                                ? "bg-red-100 text-red-500"
                                                : order.orderStatus === "Processing"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : order.orderStatus === "Dispatched"
                                                ? "bg-blue-100 text-blue-500"
                                                : order.orderStatus === "Cancelled"
                                                ? "bg-gray-100 text-gray-500"
                                                : "bg-green-100 text-green-500"
                                        }`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center space-x-2">
                                   <select onChange={(e) => handleupdatestatus(order.id, e.target.value)} className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white">
                                        <option value="Not Process">Not Process</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableOrders
