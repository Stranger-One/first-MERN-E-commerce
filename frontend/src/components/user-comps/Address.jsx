import React, { useEffect, useState } from 'react'
import { FiPlusSquare } from "react-icons/fi";
import { AddressCard, AddressForm } from '..';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { getAddress } from '@/services/addressServices';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAddresses } from '@/store/userGlobalSlice';
import { FaPlus } from 'react-icons/fa';



const Address = () => {
    const [openForm, setOpenForm] = useState(false)
    const [currentEditAddressId, setCurrentEditAddressId] = useState(null)
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.userData)
    const addresses = useSelector(state => state.userGlobal.userAddresses)


    const getAllAddress = async () => {
        const resp = await getAddress(userData.id)
        // console.log(resp);
        dispatch(setUserAddresses(resp))
    };

    useEffect(() => {
        getAllAddress()
    }, [])

    const handleAddAddress = () => {
        setCurrentEditAddressId(null)
        if (addresses?.length < 3) {
            setOpenForm(true)
        } else {
            alert('You can only add 3 addresses')
        }
    };

    return (
        <>
            <div className="col-span-full flex w-full items-center justify-between">
                <h2 className=' text-lg font-semibold'>Select Address</h2>
                <Button onClick={handleAddAddress} variant='outline' className=' font-bold py-2 px-4 rounded flex gap-2'>
                    <FaPlus /> Add a new address
                </Button>
            </div>

            {addresses?.length > 0 ? (
                addresses.map((address, index) => (
                    <AddressCard
                        key={index}
                        address={address}
                        index={index}
                        getAllAddress={getAllAddress}
                        setOpenForm={setOpenForm}
                        setCurrentEditAddressId={setCurrentEditAddressId}
                    />
                ))
            ) : null}

            <Dialog open={openForm} onOpenChange={setOpenForm}>
                <DialogContent className="max-w-[700px] ">
                    <AddressForm
                        setOpenForm={setOpenForm}
                        getAllAddress={getAllAddress}
                        addresses={addresses}
                        currentEditAddressId={currentEditAddressId}
                        setCurrentEditAddressId={setCurrentEditAddressId}
                    />
                </DialogContent>
            </Dialog>


        </>
    )
}

export default Address