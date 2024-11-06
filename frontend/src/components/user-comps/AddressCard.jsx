import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { deleteAddress } from '@/services/addressServices';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '..';
import { setSelectedAddress } from '@/store/userGlobalSlice';

const AddressCard = ({
    address,
    index,
    getAllAddress,
    setOpenForm,
    setCurrentEditAddressId
}) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const selectedAddress = useSelector(state => state.userGlobal.selectedAddress)
    
    const handleEdit = () => {
        setOpenForm(true)
        setCurrentEditAddressId(address._id)
    };

    const handleDelete = async () => {
        setLoading(true)
        const deleteStatus = await deleteAddress(address.userId, address._id);
        if(deleteStatus){
            getAllAddress();
        }
        setLoading(false)
    };
    const setCurrAddress = () => {
        dispatch(setSelectedAddress(address._id))
    };

    return (
        <Card className="w-full">
            <CardContent className="w-full p-4 ">
                <div className="w-full flex items-center justify-between ">
                    <div className="flex items-center flex-nowrap gap-1">
                        <Input type="radio" name='address' id={address._id} className='h-4 w-4' checked={address._id === selectedAddress ? true : false} onChange={setCurrAddress} />
                        <Label htmlFor={address._id} className="whitespace-nowrap text-lg cursor-pointer"> Address {index + 1}</Label>
                    </div>
                    <div className="flex gap-1">
                        <Button onClick={handleEdit} variant="outline" className="px-2 py-1" >Edit</Button>
                        <Button onClick={handleDelete} variant="outline" className="px-2 py-1" >{loading ? <Loader/> : "Delete"}</Button>
                    </div>
                </div>
                <div className="mt-2">
                    <p className=" line-clamp-2 leading-5 mb-2">{address.address}</p>
                    <h2 className='capitalize'><strong>City: </strong>{address.city} </h2>
                    <h2 className='capitalize'><strong>Phone: </strong>{address.phone} </h2>
                    <h2 className='capitalize'><strong>Pin Code: </strong>{address.pincode} </h2>
                    <p><strong>Notes: </strong>{address.notes} </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default AddressCard