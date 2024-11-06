import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'
import { Loader } from '..'
import { getProduct } from '@/services/productServices'
import { addCart, getCart } from '@/services/cartServices'

const ProductCard = ({ product, setOpenDetails, setDetailsId }) => {
    const userData = useSelector(state => state.auth.userData)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate()

    const handleCardDetails = () => {
        setOpenDetails(true)
        setDetailsId(product?._id)
    };

    const handleCart = async (e) => {
        e.stopPropagation()
        setLoading(true)
        const cart = await getCart(userData.id)
        // console.log(cart);

        if (cart.products.length > 0) {
            const thisProduct = await getProduct(product?._id)

            const thisStock = cart.products.find(prod => prod.productId === product?._id)
            // console.log(thisStock);
            if (thisStock && thisProduct.stock <= thisStock.quantity) {
                toast({
                    title: "You can't add more than the stock available!",
                })
                setLoading(false)
                return;
            }
        }

        const data = {
            userId: userData?.id,
            productId: product?._id,
            quantity: 1
        }
        // console.log(data);


        const respose = await addCart(data)
        if (respose) {
            toast({
                title: "product add to cart successfully."
            })
        }
        setLoading(false)
    };

    return (
        <Card className='overflow-hidden cursor-pointer' onClick={handleCardDetails} >
            <div className="">
                <div className="w-full h-[250px] overflow-hidden relative flex items-center justify-center rounded-t-lg p-2 md:p-3 lg:p-4">
                    {product?.stock < 10 && <span className='absolute top-1 left-1 text-sm bg-red-500 px-1 text-white rounded-xl'>
                        {product?.stock == 0 ? 'out of stock' : `only ${product?.stock} items left`}
                    </span>}
                    <img src={product?.image} alt={product?.title} className=' object-cover h-full object-center rounded-t-lg' />
                </div>
                <CardContent className='p-3'>
                    <h2 className="font-bold capitalize">{product?.title}</h2>
                    <div className="flex justify-between items-center">
                        <p className="text-slate-600 capitalize">{product?.category}</p>
                        <p className="text-slate-600 capitalize">{product?.brand}</p>
                    </div>
                    <div className="flex gap-2 justify-between">
                        <span className={`${product?.salePrice > 0 ? "line-through" : ''} text-lg font-semibold `}>${product?.price} </span>
                        {product?.salePrice > 0 ? <span>${product?.salePrice} </span> : null}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between px-3">
                    <Button disabled={product?.stock <= 0 ? true : false} className='w-full z-10' onClick={handleCart} >
                        {loading ? <Loader /> : "Add To Cart"}
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default ProductCard