import React, { useState, useEffect } from 'react';
import { getOrders } from '../../api/User';
import useShopStore from '../../store/shop-store';
import { ThaiformatDate } from '../../utils/date';
import { Numberformat } from '../../utils/number';

const HistoryCard = () => {
    const token = useShopStore(state => state.token);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        usergetorder(token);
    }, []);

    const usergetorder = async (token) => {
        try {
            const response = await getOrders(token);
            // console.log("Orders", response.data);
            setOrders(response.data);
        } catch (error) {
            console.error("Error getting orders", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            {/* Title */}
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Order History</h1>

            {/* Card Container */}
            {
                orders?.map((order, index) => (
                    <div 
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg space-y-4 mb-6"  // <-- Added mb-6 for spacing
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <div>
                                <p className="text-gray-500 text-sm">Order Date</p>
                                <p className="font-bold text-gray-800">{ThaiformatDate(order.createdAt)}</p>
                            </div>
                            <div>
                                {
                                    order.orderStatus === "Not Process" && <p className="px-3 py-1 text-xs font-semibold rounded-md text-red-500 bg-red-100">Not Processed</p>
                                }
                                {
                                    order.orderStatus === "Processing" && <p className="px-3 py-1 text-xs font-semibold rounded-md text-yellow-500 bg-yellow-100">Processing</p>
                                }
                                {
                                    order.orderStatus === "Dispatched" && <p className="px-3 py-1 text-xs font-semibold rounded-md text-blue-500 bg-blue-100">Dispatched</p>
                                }
                                {
                                    order.orderStatus === "Cancelled" && <p className="px-3 py-1 text-xs font-semibold rounded-md text-gray-500 bg-gray-100">Cancelled</p>
                                }
                                {
                                    order.orderStatus === "Completed" && <p className="px-3 py-1 text-xs font-semibold rounded-md text-green-500 bg-green-100">Completed</p>
                                }
                            </div>
                        </div>

                        {/* Product Table */}
                        <div>
                            <table className="w-full text-left">
                                <thead className="text-gray-500 text-sm border-b">
                                    <tr>
                                        <th className="py-2">Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.products.map((product, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-2 font-medium text-gray-700">{product.product.title}</td>
                                                <td>฿ {Numberformat(product.product.price)}</td>
                                                <td>{product.count}</td>
                                                <td>฿ {Numberformat(product.product.price * product.count)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* Footer - Total */}
                        <div className="flex justify-end items-center pt-4 mt-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Price</p>
                                <p className="text-lg font-semibold text-gray-800">฿ {Numberformat(order.cartTotal)}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default HistoryCard;
