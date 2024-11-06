import React, { useEffect, useState } from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { BsCash } from "react-icons/bs";
import { SiPaytm } from "react-icons/si";
import { CiCreditCard1 } from "react-icons/ci";
import { FaPaypal } from "react-icons/fa";
import { Button } from '../ui/button';
import { SelectSeparator } from '../ui/select';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Loader } from '..';
import { addOrder } from '@/services/orderServices';
import { useToast } from '@/hooks/use-toast';
import { getProduct, updateProduct } from '@/services/productServices';
import { clearCart, deleteCart } from '@/services/cartServices';


const ConfirmOrder = ({ totalCheckoutAmount, setOpenConfirmDialog }) => {
    const userData = useSelector(state => state.auth.userData)
    const cartProducts = useSelector(state => state.userGlobal.cartProducts)
    const allAddresses = useSelector(state => state.userGlobal.userAddresses)
    const selectedAddress = useSelector(state => state.userGlobal.selectedAddress)
    const [paymentMetohd, setPaymentMetohd] = useState(null)

    const {toast}=useToast()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // console.log(paymentMetohd);
    }, [paymentMetohd])

    const handleConfirmOrder = async () => {

        setLoading(true)
        // console.log(paymentMetohd)
        if (paymentMetohd === null) {
            alert("select a payment method")
            return;
        }

        const orderData = {
            userId: userData.id,
            orders: cartProducts,
            addressInfo: allAddresses.find(a => a._id === selectedAddress),
            orderStatus: 'inProgress',
            paymentMethod: paymentMetohd,
            paymentStatus: paymentMetohd === 'cash' ? 'pending' : 'paid',
            totalAmount: totalCheckoutAmount
        }

        // console.log(orderData);

        const updateProductStock = async (orders) => {
            orders.forEach( async (order) => {
                const thisProduct = await getProduct(order.productId)
                const response = await updateProduct(order.productId, {
                    ...thisProduct,
                    stock: thisProduct.stock - order.quantity
                })
                // console.log(thisProduct, response);
            })
        };
        


        const resp = await addOrder(orderData)
        if (resp) {
            updateProductStock(resp.orders)
            await clearCart(userData.id)

            // console.log(resp);
            setOpenConfirmDialog(false)
            setPaymentMetohd(null)
            toast({
                title: 'Order Placed Successfully',
            })
        }
        setLoading(false)

    };



    return (
        <DialogContent className='max-w-[800px]'>
            <DialogTitle>
                <h2 className='font-semibold text-lg'>Select Payment Method</h2>
            </DialogTitle>
            <div className="w-full grid grid-cols-2 ">
                <div className="">
                    <ul className=''>
                        <li className='flex items-center gap-4 my-1 p-2   '>
                            <Input
                                onChange={() => setPaymentMetohd('paypal')}
                                checked={paymentMetohd === 'paypal' ? true : false}
                                type="radio" name='payment' id='paypal' className='h-4 w-4' />
                            <Label htmlFor="paypal" className='flex items cursor-pointer-center gap-4'><FaPaypal className='text-xl' /> Paypal</Label>
                        </li>
                        <li className='flex items-center gap-4 my-1 p-2   '>
                            <Input
                                onChange={() => setPaymentMetohd('paytm')}
                                checked={paymentMetohd === 'paytm' ? true : false}
                                type="radio" name='payment' id='paytm' className='h-4 w-4' />
                            <Label htmlFor="paytm" className='flex items-center cursor-pointer gap-4'><SiPaytm className='text-xl' /> Paytm</Label>
                        </li>
                        <li className='flex items-center gap-4 my-1 p-2   '>
                            <Input
                                onChange={() => setPaymentMetohd('card')}
                                checked={paymentMetohd === 'card' ? true : false}
                                type="radio" name='payment' id='card' className='h-4 w-4' />
                            <Label htmlFor="card" className='flex items-center cursor-pointer gap-4'><CiCreditCard1 className='text-xl' /> Debit Card</Label>
                        </li>
                        <li className='flex items-center gap-4 my-1 p-2   '>
                            <Input
                                onChange={() => setPaymentMetohd('cash')}
                                checked={paymentMetohd === 'cash' ? true : false}
                                type="radio" name='payment' id='cash' className='h-4 w-4' />
                            <Label htmlFor="cash" className='flex items-center cursor-pointer gap-4'><BsCash className='text-xl' /> Cash On Delivery</Label>
                        </li>
                    </ul>
                </div>
                <div className="w-full h-full flex flex-col justify-between">
                    <div className="">
                        <div className="">
                            {cartProducts?.map((product, index) => (
                                <div key={index} className="flex justify-between w-full">
                                    <h2 className='font-semibold text-lg capitalize line-clamp-1'>{product.title} </h2>
                                    <p className='font-semibold text-lg'>Price: ${product.salePrice} X {product.quantity} </p>
                                </div>
                            ))}
                        </div>
                        <SelectSeparator />
                        <h2 className='flex justify-between w-full'>
                            <span className='font-bold text-lg'>Total</span>
                            <span className='font-bold text-lg'>${totalCheckoutAmount}</span>
                        </h2>
                    </div>
                    <Button onClick={handleConfirmOrder} disabled={paymentMetohd === null ? true : false} className='w-full'>{loading ? <Loader /> : "Comfirm Order"}</Button>
                </div>
            </div>
        </DialogContent>
    )
}

export default ConfirmOrder