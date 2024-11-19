import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resizer from 'react-image-file-resizer'
import { removeFiles, uploadfiles } from '../../api/Product'
import useShopStore from '../../store/shop-store'
import { LoaderCircle } from 'lucide-react'

const Uploadfile = ({ form, setForm, setIsuploading }) => {  
    const token = useShopStore(state => state.token)
    const [isLoad, setIsLoad] = useState(false)

    const onChange = (e) => {
        setIsLoad(true)
        setIsuploading(true)  // ตั้งค่า isUploading เป็น true เมื่อเริ่มการอัพโหลด
        const files = e.target.files
        if (files) {
            let allFiles = form.images
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`${file.name} is not an image.`)
                    continue
                }
                Resizer.imageFileResizer(
                    file,
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (data) => {
                        uploadfiles(token, data).then(res => {
                            allFiles.push(res.data)
                            setForm({
                                ...form,
                                images: allFiles
                            })
                            setIsLoad(false)
                            setIsuploading(false)  // ตั้งค่า isUploading เป็น false หลังอัพโหลดเสร็จ
                            toast.success('Image uploaded successfully')
                        }).catch(err => {
                            console.log('UPLOAD IMAGE RES ERR', err)
                            setIsLoad(false)
                            setIsuploading(false)  // ในกรณีที่มีข้อผิดพลาด
                        })
                    },
                    'base64'
                )
            }
        }
    }

    const handleRemove = (public_id) => {
        const images = form.images
        removeFiles(token, public_id).then(res => {
            const filterImages = images.filter(item => item.public_id !== public_id)
            setForm({
                ...form,
                images: filterImages
            })
            toast.error(res.data.msg)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <br />
            <div className='flex my-2 gap-4'>
                {isLoad && <LoaderCircle className='animate-spin' size={100} />}
                {form.images && form.images.map((image, index) => (
                    <div className='relative' key={index}>
                        <img 
                            className='hover:scale-110'
                            src={image.url}
                            alt={image.url}
                            style={{ width: '150px', height: '150px' }} />
                        <span 
                            onClick={() => handleRemove(image.public_id)}
                            className='absolute top-0 right-0 bg-red-500 p-1 rounded-md text-white'>X</span>
                    </div>
                ))}
            </div>
            <div>
                <input type="file" onChange={onChange} name="images" id="images" multiple className="form-control" />
            </div>
        </div>
    )
}

export default Uploadfile
