import React,{useState,useEffect} from 'react'
import useShopStore from '../store/shop-store'
import { currentAdmin } from '../api/Auth'
import LoadingToRedirect from './LoadingToRedirect'



const ProtectRouteAdmin = ({element}) => {

    const [ok, setOk] = useState(false)
    const user = useShopStore(state => state.user)
    const token = useShopStore(state => state.token)
    // console.log(user,token)
    
    
    useEffect(() => {
        if(user && token) {
            //send to back
            currentAdmin(token).then(res => {
                setOk(true)
                console.log('ADMIN ROUTE ACCESS')
            }).catch(err => {
                setOk(false)
                console.log('ADMIN ROUTE DENIED')
            }
            )
        }
    },[user,token])


  return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteAdmin