import React from 'react'
import { Link } from 'react-router-dom'
import useShopStore from '../../store/shop-store'
import { removeProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Numberformat } from '../../utils/number'
import { ThaiformatDate } from '../../utils/date'


const TableFormProduct = ({ products }) => {

  const token = useShopStore(state => state.token)
  const navigate = useNavigate()
  const getProducts = useShopStore(state => state.getProducts)


  const handleRemove = async (id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try {
        const res = await removeProduct(token, id)
        console.log(res)
        if (res.status === 200) {
          toast.success(`${res.data.msg}`)
          getProducts(token)


        } else {
          toast.error('Something went wrong')
        }
        
      } catch (error) {
        console.log(error)
        
      }
    }
  }

  return (
    <table className='min-w-full divide-y divide-gray-200 table-auto'>
      <thead className='bg-gray-50'>
        <tr>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            ชื่อสินค้า
          </th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            รายละเอียด
          </th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            ราคา
          </th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            จำนวน
          </th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            จำนวนที่ขายได้
          </th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            หมวดหมู่
          </th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            วันที่อัพเดท
          </th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            รูปสินค้า
          </th>
          <th  className='px-6 py-3   text-xs font-medium text-gray-500 uppercase tracking-wider text-left'>
            จัดการ
          </th>

        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {products.map((p, i) => (
          <tr key={i}>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
              {p.title}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {p.description}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {Numberformat(p.price)} 
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {p.quantity}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {p.sold}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {p.category.name}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {ThaiformatDate(p.createdAt)}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {
                p.images.length > 0
                ? <img 
                className='w-24 h-24 rounded-sm'
                src={p.images[0].url} alt={p.images[0].url} />
                : <div
                className='bg-gray-300 h-24 w-24 flex rounded-sm items-center justify-center'
                >
                  No Image
                </div>
              }
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex'>
              <p className='bg-blue-500 rounded-md  text-white p-2'><Link to={'/admin/product/'+p.id}>แก้ไข</Link></p>
                <p 
                onClick={() => handleRemove(p.id)}
                className='bg-red-500 rounded-md text-white p-2 ml-2'>ลบ</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableFormProduct
