import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; //localStorage
import { listCategory } from '../api/Category';
import { listProduct, searchFilters } from '../api/Product';
import _ from 'lodash';


const shopStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  actionLogin: async (form) => {
    const response = await axios.post('https://shop-api-beige.vercel.app/api/login', form)
    set({ user: response.data.payload, token: response.data.token })
    return response
  },
  getCategories: async () => {
    try {
      const res = await listCategory()
      // console.log(res)
      set({ categories: res.data })
    } catch (error) {
      console.log(error)
    }
  },
  getProducts: async (count) => {
    try {
      const res = await listProduct(count)
      set({ products: res.data })
    } catch (error) {
      console.log(error)
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg)
      set({ products: res.data })
    } catch (error) {
      console.log(error)
    }
  },
  actionAddtoCart: (product) => {
    set((state) => {
      const existingProduct = state.carts.find((item) => item.id === product.id);

      // ถ้ามีสินค้าชนิดเดิมอยู่ในตะกร้าแล้ว
      if (existingProduct) {
        return {
          carts: state.carts.map((item) =>
            item.id === product.id
              ? { ...item, count: item.count + 1 }  // เพิ่มจำนวนสินค้าชนิดเดิม
              : item
          ),
        };
      } else {
        // ถ้ายังไม่มีสินค้าชนิดนี้ในตะกร้า
        return {
          carts: [...state.carts, { ...product, count: 1 }],
        };
      }
    });
  },
  actionUpdateQuantity: (productId, newQuan) => {
    console.log('update', productId, newQuan)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuan) }
          : item
      )
    }))
  },
  actionRemoveProduct: (productId) => {
    // console.log('remove',productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId)
    }))
  },
  actionGetTotalPrice: () => {
    const carts = get().carts
    return carts.reduce((acc, item) => acc + (item.price * item.count), 0)
  },
  actionClearCart: () => {
    set({ carts: [] })
  },
  actionLogout: () => {
    set({
      user: null,
      token: null,
      carts: [],
      categories: [],
      products: [],
    })
    return true
  }
})

const usePersis = {
  name: 'shop-store',
  storage: createJSONStorage(() => localStorage)
}
const useShopStore = create(persist(shopStore, usePersis))


export default useShopStore