import React from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { SelectSeparator } from '../ui/select'
import { useSelector } from 'react-redux'

const OrderDetailsDialog = ({ order }) => {
    const userData = useSelector(state => state.auth.userData)
    return (
        <DialogContent className='max-w-[80vw] '>
            <DialogTitle>Order Details</DialogTitle>
            <div className="max-h-[70vh] overflow-y-auto px-2">
                <div className="w-full mt-2">
                    <ul>
                        <li className='flex w-full items-center justify-between my-1 font-semibold'><span>Order ID</span> <span>{order?._id}</span></li>
                        <li className='flex w-full items-center justify-between my-1 font-semibold'><span>Order Date</span> <span>{order?.createdAt?.split('T')[0]}</span></li>
                        <li className='flex w-full items-center justify-between my-1 font-semibold'><span>Order Price</span> <span>${order?.totalAmount}</span></li>
                        <li className='flex w-full items-center justify-between my-1 font-semibold'><span>Order Status</span> <span>{order?.orderStatus}</span></li>
                    </ul>
                </div>
                <SelectSeparator className='my-4' />
                <div className="">
                    <h2 className='font-semibold'>Order Details</h2>
                    <ul>
                        {order?.orders?.map(product => (
                            <li className='flex w-full items-center justify-between my-1'><span>{product.title} </span> <span>${product.salePrice}</span></li>
                        ))}
                    </ul>
                </div>
                <SelectSeparator className='my-4' />
                <div className="">
                    <h2 className='font-semibold'>Shipping Info</h2>
                    <ul>
                        <li className='flex w-full items-center justify-between my-1'><span>Name: </span> <span>{userData.userName} </span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>Address: </span> <span>{order?.addressInfo?.address}</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>City: </span> <span>{order?.addressInfo?.city}</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>Pin Code: </span> <span>{order?.addressInfo?.pincode}</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>Phone: </span> <span>{order?.addressInfo?.phone}</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>Notes: </span> <span>{order?.addressInfo?.notes}</span></li>
                    </ul>
                </div>
            </div>
        </DialogContent>
    )
}

export default OrderDetailsDialog