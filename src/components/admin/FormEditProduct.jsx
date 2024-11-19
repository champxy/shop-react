import React, { useState, useEffect } from 'react'
import useShopStore from '../../store/shop-store'
import { createProduct, readProduct, listProduct, updateProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import TableFormProduct from './TableFormProduct'
import Uploadfile from './uploadfile'
import { useParams,useNavigate } from 'react-router-dom'

const initialState = {
    title: "CoreI-69",
    description: "desc",
    price: 8000,
    quantity: 10,
    categoryId: '',
    images: []
}
const FormEditProduct = () => {
    const { id } = useParams()
    const token = useShopStore(state => state.token)
    const navigate = useNavigate()
    const categories = useShopStore(state => state.categories)
    const getCategories = useShopStore(state => state.getCategories)
    const [form, setForm] = useState(initialState) //get data
    // console.log(products)
    const [isuploading, setIsuploading] = useState(false)
    const handleOnChage = (e) => {
        // console.log(e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(form)
        try {
            const res = await updateProduct(token, id, form)
            if (res.status === 200) {
                toast.success(`${res.data.title} updated`)
                //timeout
                setTimeout(() => {
                    navigate('/admin/product')
                }, 2000)

            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getCategories(token)
        fetchProduct(token, id)

    }, [])

    const fetchProduct = async (token,id) => {
        try {
            const res = await readProduct(token, id)
            console.log('fetchProduct', res)    
            setForm(res.data)

        } catch (error) {
            console.log('fetchProduct', error)
        }
    }
    // console.log(form)

    // console.log(categories)

    return (
        <div className='container mx-auto p-5 bg-white shadow-md'>
            <form onSubmit={handleSubmit} className=''>
                <h1 className="text-3xl font-semibold mb-4">เพิ่มข้อมูลสินค้า</h1>

                <div className="space-y-4">
                    <div className="flex items-center">
                        <label htmlFor="title" className="w-1/5 text-center text-gray-800">ชื่อสินค้า</label>
                        <input
                            type="text"
                            className="w-3/4 form-control ml-2 border rounded-md py-2 px-4"
                            value={form.title}
                            onChange={handleOnChage}
                            name="title"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="description" className="w-1/5 text-center text-gray-700">รายละเอียด</label>
                        <input
                            type="text"
                            className="w-3/4 form-control ml-2 border rounded-md py-2 px-4"
                            value={form.description}
                            onChange={handleOnChage}
                            name="description"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="price" className="w-1/5 text-center text-gray-700">ราคา</label>
                        <input
                            type="number"
                            className="w-3/4 form-control ml-2 border rounded-md py-2 px-4"
                            value={form.price}
                            onChange={handleOnChage}
                            name="price"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="quantity" className="w-1/5 text-center text-gray-700">จำนวน</label>
                        <input
                            type="number"
                            className="w-3/4 form-control ml-2 border rounded-md py-2 px-4"
                            value={form.quantity}
                            onChange={handleOnChage}
                            name="quantity"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="categoryId" className="w-1/5 text-center text-gray-700">หมวดหมู่</label>
                        <select
                            className="w-3/4 form-control ml-2 border rounded-md py-2 px-4"
                            value={form.categoryId}
                            onChange={handleOnChage}
                            name="categoryId"
                            required
                        >
                            <option value="" disabled>Please Select</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <Uploadfile form={form} setForm={setForm} setIsuploading={setIsuploading} />

                

                <button
                    className={`bg-red-500 rounded-md w-1/4 text-white py-2 mt-4 mb-2 ${isuploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isuploading}  // ปิดการใช้งานปุ่มเมื่อกำลังอัพโหลด
                >
                    บันทึก
                </button>


            </form>

        </div>
    )
}

export default FormEditProduct