import React,{useState,useEffect} from 'react'
import useShopStore from '../store/shop-store'
import { currentUser } from '../api/Auth'
import LoadingToRedirect from './LoadingToRedirect'



const ProtectRouteUser = ({element}) => {

    const [ok, setOk] = useState(false)
    const user = useShopStore(state => state.user)
    const token = useShopStore(state => state.token)
    
    useEffect(() => {
        if(user && token) {
            //send to back
            currentUser(token).then(res => {
                setOk(true)
            }).catch(err => {
                setOk(false)
            }
            )
        }
    },[user,token])


  return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteUser