import React, { useEffect, useState } from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { SelectSeparator } from '../ui/select'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateOrder } from '@/services/orderServices'
import { Loader } from '..'

const AdminOrderDetailsDialog = ({ order, getAllUsersOrders, setOpenDetailsDialog }) => {

    const [disableUpdate, setDisableUpdate] = useState(true)
    const [updatedOption, setUpdatedOption] = useState(null)
    const [loading, setLoading] = useState(false)


    const changeStatus = (value) => {
        // console.log(value);
        setUpdatedOption(value)
        setDisableUpdate(false)
    };

    const handleUpdateOrder = async () => {
        setLoading(true)
        // console.log(order._id, updatedOption);
        const response = await updateOrder(order._id, updatedOption)
        if (response) {
            // console.log(response);
            getAllUsersOrders()
        }
        setDisableUpdate(true)

        setLoading(false)
        setOpenDetailsDialog(false)
    };


    return (
        <DialogContent className=''>
            <DialogTitle>Order Details</DialogTitle>
            <div className="max-h-[70vh] overflow-y-auto px-2 ">
                <div className="w-full mt-2 ">
                    <ul>
                        <li className='flex w-full items-center justify-between my-1 font-semibold'><span>Order ID</span> <span>{order?._id}</span></li>
                        <li className='flex w-full items-center justify-between my-1 font-semibold'><span>Order Date</span> <span>{order?.createdAt?.split('T')[0]}</span></li>
                        <li className='flex w-full items-center justify-between my-1 font-semibold'><span>Order Price</span> <span>${order?.totalAmount}</span></li>
                        <li className='flex w-full items-center justify-between my-1 font-semibold'><span>Order Status</span>
                            <Select onValueChange={changeStatus} defaultValue={order?.orderStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="inProgress">In Progress</SelectItem>
                                        <SelectItem value="inShipping">In Shipping</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </li>
                    </ul>
                </div>
                <SelectSeparator />
                <div className="">
                    <h2 className='font-semibold'>Order Details</h2>
                    <ul>
                        {order?.orders?.map(product => (
                            <li className='flex w-full items-center justify-between my-1'><span>{product.title} </span> <span>${product.salePrice}</span></li>
                        ))}
                    </ul>
                </div>
                <SelectSeparator />
                <div className="">
                    <h2 className='font-semibold'>Shipping Info</h2>
                    <ul>
                        <li className='flex w-full items-center justify-between my-1'><span>Name: </span> <span>john deo</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>Address: </span> <span>{order?.addressInfo?.address}</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>City: </span> <span>{order?.addressInfo?.city}</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>Pin Code: </span> <span>{order?.addressInfo?.pincode}</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>Phone: </span> <span>{order?.addressInfo?.phone}</span></li>
                        <li className='flex w-full items-center justify-between my-1'><span>Notes: </span> <span>{order?.addressInfo?.notes}</span></li>
                    </ul>
                </div>
                <div className="w-full">
                    <Button onClick={handleUpdateOrder} disabled={disableUpdate} className='w-full'>{loading ? <Loader /> : "Update Product"}</Button>
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminOrderDetailsDialog