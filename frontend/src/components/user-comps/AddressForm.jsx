import React, { useEffect, useState } from 'react'
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RiLoader2Line } from "react-icons/ri";
import { Loader } from '..'
import { addAddress, updateAddress } from '@/services/addressServices'
import { useSelector } from 'react-redux'


const AddressForm = ({
    setOpenForm,
    getAllAddress,
    addresses,
    currentEditAddressId,
    setCurrentEditAddressId
}) => {
    const [loading, setLoading] = useState(false)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')

    const userData = useSelector(state => state.auth.userData)
    const [currentAddress, setCurrentAddress] = useState(null)

    useEffect(() => {
        if (currentEditAddressId) {
            const findAddress = addresses.find(item => item._id === currentEditAddressId)

            setCurrentAddress(findAddress)
            setAddress(findAddress.address)
            setCity(findAddress.city)
            setPincode(findAddress.pincode)
            setPhone(findAddress.phone)
            setNotes(findAddress.notes)
        }

    }, [])


    const handleCancle = () => {
        setAddress('')
        setCity('')
        setPincode('')
        setPhone('')
        setNotes('')

        setOpenForm(false)
    };

    const handleAddAddress = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            userId: userData.id,
            address,
            city,
            phone,
            pincode,
            notes
        }
        // console.log(data);
        if (currentEditAddressId === null) {
            const add = await addAddress(data)
            // console.log(add);
            if (add) {
                getAllAddress()
                setOpenForm(false)
            }
        } else {
            const updated = await updateAddress(currentAddress.userId, currentAddress._id, data)
            if(updated){
                // console.log("address updated successfully!");
                getAllAddress()
                setOpenForm(false)
                setCurrentEditAddressId(null)
            }
        }

        setLoading(false)
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Add a new address</DialogTitle>
                <DialogDescription>
                    <div className="">
                    <form onSubmit={handleAddAddress} className='w-full grid grid-cols-2 gap-4 mt-4 '>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="address">Address</Label>
                            <Input required type="text" id="address" placeholder="Enter Your Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="city">City</Label>
                            <Input required type="text" id="city" placeholder="Enter Your City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input required type="text" id="phone" placeholder="Enter Your Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="pincode">Pin Code</Label>
                            <Input required type="text" id="pincode" placeholder="Enter Your Pin Code" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5 ">
                            <Label htmlFor="note">Note</Label>
                            <Input required type="text" id="note" placeholder="Enter Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                        </div>
                        <div className="col-span-full flex justify-end gap-4">
                            <Button type="button" variant="secondary" onClick={handleCancle}>
                                Cancle
                            </Button>

                            <Button type="submit" variant="secondary" >
                                {loading ? <Loader /> : currentEditAddressId ? "Update" : 'Add'}
                            </Button>
                        </div>
                    </form>
                    </div>  
                </DialogDescription>
            </DialogHeader>
        </>
    )
}

export default AddressForm