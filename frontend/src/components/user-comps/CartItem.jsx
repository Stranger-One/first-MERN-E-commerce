import { useToast } from '@/hooks/use-toast';
import { deleteCart, getCart, updateCart } from '@/services/cartServices';
import { getProduct } from '@/services/productServices';
import { setCartProduct, setCartProductQuantity } from '@/store/userGlobalSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

const CartItem = ({ product, setTotalCheckoutAmount }) => {
    const [quantity, setQuantity] = useState(product?.quantity)
    const userData = useSelector(state => state.auth.userData)
    const cartProducts = useSelector(state => state.userGlobal.cartProducts)
    const dispatch = useDispatch()
    const [thisProduct, setThisProduct] = useState(null)
    // const toast = useToast()

    // console.log(product);

    const getThisProduct = async () => {
        const response = await getProduct(product?.productId)
        // console.log("thisProduct",response);
        setThisProduct(response)
    }

    const updateQuantity = async (quantity) => {
        const response = await updateCart(userData.id, product.productId, quantity)
        // console.log(response);
        dispatch(setCartProductQuantity({ quantity, id: product.productId }))
    };

    const handleDecrease = () => {
        if (quantity == 1) return
        setQuantity(prev => prev - 1)
        updateQuantity(quantity - 1)
    };

    const handleIncrease = () => {
        if(quantity == thisProduct?.stock){
            // toast({
            //     title: "You can't add more than the stock available!",
            // })
            alert("You can't add more than the stock available!")
            return;
        }
        if (quantity == 10) return
        setQuantity(prev => prev + 1)
        updateQuantity(quantity + 1)
    };

    const calculateTotal = () => {
        let totalAmount = 0
        cartProducts.map(product => {
            totalAmount += (product.salePrice * product.quantity)
        })
        setTotalCheckoutAmount(totalAmount)
    };

    useEffect(() => {
        getThisProduct()
        calculateTotal()

    }, [cartProducts])

    const handleDelete = async () => {

        // console.log(userData.id, product.productId);
        const response = await deleteCart(userData.id, product.productId)
        // console.log(response);
        if (response) {
            // const repsonse = await getCart(userData.id)
            // console.log(repsonse);
            // dispatch(setCartProduct(repsonse.products))
            const updatedList = cartProducts.filter(prod => prod.productId != product.productId)
            dispatch(setCartProduct(updatedList))
        }
    };


    return (
        <div className='w-full flex justify-between  gap-3 my-2'>
            <div className="flex gap-2">
                <div className="w-20 h-20 rounded-md overflow-hidden">
                    <img src={product?.image} alt="" className='w-full object-cover object-center' />
                </div>
                <div className="">
                    <h2 className=" font-semibold line-clamp-1 leading-5">{product?.title}</h2>
                    <div className="flex items-center gap-2 mt-4">
                        <button onClick={handleDecrease} className='text-2xl'><CiSquareMinus /></button>
                        <span>{quantity} </span>
                        <button onClick={handleIncrease} className='text-2xl'><CiSquarePlus /></button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className='flex gap-2 mb-2'>
                    {product?.salePrice > 0 ? (
                        <>
                            <span className="font-bold line-through">${product?.price}</span>
                            <span className="font-semibold ">${product?.salePrice}</span>
                        </>
                    ) : (
                        <span className="font-extrabold">${product?.price}</span>
                    )}
                </div>
                <button onClick={handleDelete} className='text-2xl border-[1px] border-zinc-600 rounded-md p-[2px] '><MdDelete /></button>
            </div>
        </div>
    )
}

export default CartItem