import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { FaStar } from "react-icons/fa6";
import { Button } from '../ui/button';
import { Review } from '..';
import { Input } from '../ui/input';
import { getProduct } from '@/services/productServices';
import { addCart, getCart } from '@/services/cartServices';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';



const ProductDetails = ({ openDetails, setOpenDetails, detailsId }) => {
    const [thisProduct, setThisProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const userData = useSelector(state => state.auth.userData)
    const {toast} = useToast()

    const fetchProduct = async (id) => {
        setLoading(true)

        const response = await getProduct(id)
        setThisProduct(response)

        setLoading(false)
    };

    const handleCart = async (e) => {
        e.stopPropagation()
        setLoading(true)
        const cart = await getCart(userData.id)
        // console.log(cart);

        if(cart.products.length > 0 ){
            const thisProduct = await getProduct(detailsId)

            const thisStock = cart.products.find(prod => prod.productId === detailsId)
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
            productId: detailsId,
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


    useEffect(() => {
        if (detailsId) {
            // console.log('Fetching product with ID:', detailsId);
            fetchProduct(detailsId)
        }
    }, [detailsId])


    return (
        <Dialog open={openDetails} onOpenChange={setOpenDetails} >
            <DialogTrigger>
                <button style={{ display: 'none' }}>Open</button>
            </DialogTrigger>

            <DialogContent className="max-w-[90vw] max-h-[90vh] grid grid-cols-[40%_auto] p-10">
                <DialogTitle className="col-span-full">
                    <h2 className="text-2xl font-bold text-gray-900 ">Product Details</h2>
                </DialogTitle>
                {loading ? (
                    <div className="col-span-full flex items-center justify-center">
                        Loading...
                    </div>
                ) : (
                    <>
                        <div className="relative overflow-hidden ">
                            <img src={thisProduct?.image} alt={thisProduct?.title} width={500} className='aspect-square object-cover rounded-lg' />
                        </div>
                        <div className="">
                            <div className="flex flex-col gap-2">
                                <h1 className='text-3xl font-bold capitalize'>{thisProduct?.title} </h1>
                                <p className='text-zinc-500 capitalize'>{thisProduct?.description} </p>
                                <div className="flex gap-2">
                                    {thisProduct?.salePrice ? (
                                        <>
                                            <h2 className='text-lg font-bold line-through'>${thisProduct?.price} </h2>
                                            <h2 className='text-lg font-semibold'>${thisProduct?.salePrice} </h2>
                                        </>
                                    ) : (
                                        <h2 className='text-lg font-bold'>${thisProduct?.price} </h2>
                                    )}
                                </div>
                                <div className="flex gap-1 flex-nowrap items-center">
                                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                        <FaStar className='text-lg' />
                                    </div>
                                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                        <FaStar className='text-lg' />
                                    </div>
                                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                        <FaStar className='text-lg' />
                                    </div>
                                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                        <FaStar className='text-lg' />
                                    </div>
                                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                        <FaStar className='text-lg' />
                                    </div>
                                    <span className='text-lg font-semibold'>5.0</span>
                                </div>
                                <Button disabled={thisProduct?.stock <= 0 ? true : false} onClick={handleCart} className="w-full mt-2">Add to Cart</Button>
                            </div>
                            <div className="mt-2 border-t-[1px] border-zinc-500 h-52 overflow-auto flex flex-col gap-2 px-2">
                                <h2 className='font-bold'>Reviews</h2>
                                <div className=" ">
                                    <Review />
                                    <Review />
                                    <Review />
                                </div>
                                <div className="p-2">
                                    <h3 className='font-semibold text-sm mb-2'>Write a review</h3>
                                    <div className="flex gap-1 flex-nowrap items-center">
                                        <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                            <FaStar className='text-lg' />
                                        </div>
                                        <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                            <FaStar className='text-lg' />
                                        </div>
                                        <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                            <FaStar className='text-lg' />
                                        </div>
                                        <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                            <FaStar className='text-lg' />
                                        </div>
                                        <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                                            <FaStar className='text-lg' />
                                        </div>
                                    </div>
                                </div>
                                <Input type='text' placeholder='write a review...' className="outline-none border-none " />
                                <Button className="w-full mt-2">Submit</Button>
                            </div>
                        </div>
                    </>
                )}

            </DialogContent>
        </Dialog>
    )
}

export default ProductDetails