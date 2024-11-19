import React, { useState, useEffect } from 'react'
import useShopStore from '../../store/shop-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Numberformat} from '../../utils/number'

const SearchCard = () => {
    const getProducts = useShopStore(state => state.getProducts)
    const products = useShopStore(state => state.products)
    const actionSearchFilters = useShopStore(state => state.actionSearchFilters)
    const getCategories = useShopStore(state => state.getCategories)
    const categories = useShopStore(state => state.categories)

    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])
    const [price, setPrice] = useState([1000, 30000])
    const [ok, setOk] = useState(false)

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text });
            } else {
                getProducts();
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [text]);

    const handleCheck = (e) => {
        const inCheck = e.target.value
        const inState = [...categorySelected]
        const findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelected(inState)
        actionSearchFilters({ category: inState })
        if (inState.length === 0) {
            getProducts()
        }
    }

    useEffect(() => {
        actionSearchFilters({ price: price })
    }, [ok])

    const handleprice = (value) => {
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-6">
            <div className='flex justify-start'>
            <h1 className="text-center text-2xl font-semibold text-gray-800">Search</h1>
            </div>
            {/* Search by text */}
            <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="here..."
                className="w-full p-3 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <hr className="my-6" />

            {/* Search by category */}
            <h2 className="text-xl font-semibold text-gray-800">Category</h2>
            <div className="space-y-4">
                {categories.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            type="checkbox"
                            onChange={handleCheck}
                            value={item.id}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-3 text-gray-600">{item.name}</label>
                    </div>
                ))}
            </div>

            <hr className="my-6" />

            {/* Search by price */}
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Price Range</h2>
                <div className="flex justify-between text-gray-600">
                    <span>Min ฿{ Numberformat(price[0])}</span>
                    <span>Max ฿{ Numberformat(price[1])}</span>
                </div>
                <Slider
                    className=""
                    onChange={handleprice}
                    range
                    min={0}
                    max={100000}
                    defaultValue={[1000, 30000]}
                    trackStyle={[{ backgroundColor: '#3B82F6' }]}
                    handleStyle={[
                        { borderColor: '#3B82F6', backgroundColor: '#fff' },
                    ]}
                />
            </div>
        </div>
    )
}

export default SearchCard
