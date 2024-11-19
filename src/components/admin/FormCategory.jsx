import React, {useState,useEffect} from 'react'
import { createCategory,listCategory, removeCategory } from '../../api/Category'
import useShopStore from '../../store/shop-store'
import { toast } from 'react-toastify'


const FormCategory = () => {
  const token = useShopStore(state => state.token)
  const [name, setName] = useState('')
  // const [categories, setCategories] = useState([])
  const categories = useShopStore(state => state.categories)
  const getCategories = useShopStore(state => state.getCategories)
  useEffect(() => {
    getCategories(token)
  }, [])

 


  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = {name}
    // console.log(form)
    try {
      const res = await createCategory(token, form)
      if(res.status === 200){
        toast.success('Category created')
        getCategories(token)
      }else{
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ConfirmDelete = (token,id) => {
    if(window.confirm('Are you sure you want to delete this category?')){
      handleDelete(token,id)
    }
  }

  const handleDelete = async (token,id) => {
    try {
      // console.log(id)
      // console.log(token)
      const res = await removeCategory(token, id)

      if(res.status === 200){
        toast.success(`Category ${res.data.name}  deleted`)
        getCategories(token)
      }else{
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container mx-auto p-5 bg-white shadow-md'>
      <h1>Category Management</h1>
      <form onSubmit={handleSubmit} className=''>
        <input type='text' 
        onChange={(e)=>setName(e.target.value)}
        placeholder='Category Name' className='border border-gray-400 p-2 w-50 my-2 rounded-md '  required/>
        <button className='bg-blue-500 rounded-md ml-2 text-white p-2'>Create</button>
      </form>
      <hr/>
      <div className=' w-full max-w-sm justify-center'>
        {
          categories.map((item,index)=>
            <li key={index} 
            className='flex justify-between items-center border border-gray-100 p-2 my-2 rounded-md'
            >
              <span>{item.name}</span>
              
              <button onClick={
                ()=>ConfirmDelete(token,item.id)
              } className='bg-red-500 rounded-md ml-2 text-white p-2'>Delete</button>
              </li>
          )
        }
        </div>
    </div>
  )
}

export default FormCategory