import React, { useEffect, useState } from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import { SelectSeparator } from '../ui/select'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { CartItem } from '..'
import { useNavigate } from 'react-router-dom'

const CartWrapper = ({ loadingProducts, setOpenCartSheet  }) => {
    const navigate = useNavigate()
    const cartProducts = useSelector(state => state.userGlobal.cartProducts)
    const dispatch = useDispatch()
    const [totalCheckoutAmount, setTotalCheckoutAmount] = useState(0)



    const handleCheckout = () => {
        navigate('/user/checkout')
        setOpenCartSheet(false)
    };

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    Your Cart
                </SheetTitle>
            </SheetHeader>
            <div className="mt-8 h-[60vh] ">
                {loadingProducts ? (
                    <div className="w-full flex items-center justify-center">
                        Loading...
                    </div>
                ) : (
                    <div className="w-full h-full overflow-auto">
                        {cartProducts.length > 0 ? cartProducts?.map((product, index) => (
                            <CartItem key={index} product={product} setTotalCheckoutAmount={setTotalCheckoutAmount} />
                        )) : (
                            <div className="w-full flex items-center justify-center">
                                <p className='text-lg font-bold'>No products in cart</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {cartProducts.length > 0 && (
                <>
                    <SelectSeparator className="border-[1px] my-4 " />
                    <div className="mt-8">
                        <div className="flex justify-between">
                            <span className='font-bold'>Total</span>
                            <span className='font-bold'>${totalCheckoutAmount}</span>
                        </div>
                    </div>
                    <Button onClick={handleCheckout} className="w-full mt-4">Checkout</Button>
                </>
            )}

        </SheetContent>
    )

}

export default CartWrapper