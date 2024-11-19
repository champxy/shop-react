import React, { useEffect, useState } from 'react';
import { getlistAllUser, changeStatusUser, changeRoleUser } from '../../api/Admin';
import useShopStore from '../../store/shop-store';
import {ThaiformatDate} from '../../utils/date'




const TableAllUser = () => {
    const token = useShopStore(state => state.token);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers(token);
    }, []);

    const getUsers = async (token) => {
        await getlistAllUser(token)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));

    };
// console.log(users)
    const handleChangeStatusUser = async (userid, userstatus) => {
        // console.log(userid, userstatus)
        const value = {
            id: userid,
            enabled: userstatus === "true"
        }

        // console.log(value)
        await changeStatusUser(token, value)
            .then(res => {
                console.log(res.data)
                getUsers(token);
            })
            .catch(err => console.log(err));

    }

    const handleChangeRoleUser = async (userid, userrole) => {
        // console.log(userid, userrole)
        const value = {
            id: userid,
            role: userrole
        }

        // console.log(value)
        await changeRoleUser(token, value)
            .then(res => {
                console.log(res.data)
                getUsers(token);
            }
            )
            .catch(err => console.log(err));
    }

    // console.log(users)
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">User List</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-3 px-4 font-semibold text-left">No.</th>
                            <th className="py-3 px-4 font-semibold text-left">Email</th>
                            <th className="py-3 px-4 font-semibold text-left">Date Updated</th>
                            <th className="py-3 px-4 font-semibold text-left">Role</th>
                            <th className="py-3 px-4 font-semibold text-left">Status</th>
                            {/* <th className="py-3 px-4 font-semibold text-left">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr
                                key={index}
                                className="hover:bg-blue-50 border-b transition duration-200 ease-in-out"
                            >
                                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                                <td className="py-3 px-4 text-gray-700">{user.email}</td>
                                <td className="py-3 px-4 text-gray-600">
                                    {ThaiformatDate(user.updatedAt)}
                                </td>
                                <td className="py-3 px-4 text-gray-700">
                                    <select
                                        className={`px-3 py-1 rounded-md ${user.role === "user"
                                            ? "bg-gray-200 text-blue-800" // Active state colors
                                            : "bg-cyan-500 text-white"     // Inactive state colors
                                            }`}
                                        value={user.role}

                                        onChange={(e) => handleChangeRoleUser(user.id, e.target.value)}
                                    >
                                        <option value="user" className="bg-white text-blue-800">
                                            USER
                                        </option>
                                        <option value="admin" className="bg-white text-green-800">
                                            ADMIN
                                        </option>
                                    </select>
                                </td>
                                <td className="py-3 px-4">
                                    <select
                                        className={`px-3 py-1 rounded-md ${user.enabled === true
                                            ? "bg-green-200 text-green-800" // Active state colors
                                            : "bg-red-200 text-red-800"     // Inactive state colors
                                            }`}
                                        value={user.enabled}
                                        onChange={(e) => handleChangeStatusUser(user.id, e.target.value)}
                                    >
                                        <option value="true" className="bg-white text-green-800">
                                            Active
                                        </option>
                                        <option value="false" className="bg-white text-red-800">
                                            Inactive
                                        </option>
                                    </select>
                                </td>

                                {/* <td className="py-3 px-4 space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                                        hi
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableAllUser;
