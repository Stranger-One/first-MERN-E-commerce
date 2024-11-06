import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { setCurrentEditProduct } from '@/store/adminGlobalSlice'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { deleteProduct } from '@/services/productServices'

const AdminProductCard = ({ product, setOpenPopover, setCurrentEditId, setActonButtonText, fetchAllProducts }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const handleEdit = () => {
        setCurrentEditId(product?._id)
        setOpenPopover(true)
        setActonButtonText('Update')
        dispatch(setCurrentEditProduct(product))
        // console.log(product);
    }

    const handleDelete = async () => {
        const deletedProduct = await deleteProduct(product?._id)
        if (deletedProduct) {
            // console.log(deletedProduct);
            toast({
                title: "Product deleted Successfully"
            })
            fetchAllProducts()
        }
    }

    return (
        <Card className='overflow-hidden'>
            <div className="">
                <div className="w-full h-[250px] overflow-hidden relative flex items-center justify-center rounded-t-lg p-2 md:p-3 lg:p-4">
                    {product?.stock < 10 && <span className='absolute top-1 left-1 text-sm bg-red-500 px-1 text-white rounded-xl'>
                        {product?.stock == 0 ? 'out of stock' : `only ${product?.stock} items left`}
                    </span>}
                    <img src={product?.image} alt={product?.title} className='object-cover h-full object-center rounded-t-lg' />
                </div>
                <CardContent>
                    <h2 className="text-lg font-bold capitalize">{product?.title}</h2>
                    <div className="flex gap-2 justify-between">
                        <span className={`${product?.salePrice > 0 ? "line-through" : ''}  `}>${product?.price} </span>
                        {product?.salePrice > 0 ? <span>${product?.salePrice} </span> : null}
                    </div>
                    <div className="flex gap-2 justify-between">
                        <p className='text-lg font-semibold'>Available: </p>
                        <p className='text-lg font-semibold'>{product?.stock} </p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleEdit} >Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default AdminProductCard