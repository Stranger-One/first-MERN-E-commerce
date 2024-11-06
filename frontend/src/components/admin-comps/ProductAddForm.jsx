import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { MdAdd } from "react-icons/md";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiUploadCloud } from "react-icons/fi";
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaRegFileAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { addProduct, updateProduct } from '@/services/productServices';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';

const ProductAddForm = ({
    openPopover,
    setOpenPopover,
    actonButtonText,
    setActonButtonText,
    fetchAllProducts,
}) => {
    const [imageFile, setImageFile] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState('')

    const [isButtonEnable, setIsButtonEnable] = useState(false)
    const [loadingAdd, setLoadingAdd] = useState(false)
    const { toast } = useToast()

    const currentEditProduct = useSelector(state => state.adminGlobal.currentEditProduct)


    const handleImageChange = (e) => {
        // console.log(e.target.files);
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setImageFile(selectedFile)
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault()
    };

    const handleDrop = (e) => {
        e.preventDefault()
        const selectedFile = e.dataTransfer.files?.[0]
        if (selectedFile) setImageFile(selectedFile)
    };

    const uploadImageToCloudinary = async () => {
        setImageUploading(true)
        const data = new FormData()
        data.append("my_file", imageFile)
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products/upload-image`, data)

        if (response?.data?.success) {
            setUploadedImageUrl(response.data.result.url)
            // console.log("response", response.data);
        }
        setImageUploading(false)
    };

    useEffect(() => {
        if (actonButtonText === 'Update') {
            // console.log(currentEditProduct);

            setTitle(currentEditProduct?.title)
            setPrice(currentEditProduct?.price)
            setSalePrice(currentEditProduct?.salePrice)
            setDescription(currentEditProduct?.description)
            setCategory(currentEditProduct?.category)
            setBrand(currentEditProduct?.brand)
            setStock(currentEditProduct?.stock)
            setUploadedImageUrl(currentEditProduct?.image)
            setImageFile(currentEditProduct?.image)

        }
    }, [currentEditProduct])

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary()
    }, [imageFile])

    useEffect(() => {
        if (title && price && description && category && brand && stock && uploadedImageUrl && imageFile) {
            setIsButtonEnable(true)
        } else {
            setIsButtonEnable(false)
        }
        // console.log({uploadedImageUrl, title, price, salePrice, description, category, brand, stock, imageFile});
    }, [uploadedImageUrl, title, price, description, category, brand, stock, imageFile])

    const handleButtonClick = () => {
        setOpenPopover(!openPopover)
        setActonButtonText('Add')
        setTitle('')
        setPrice('')
        setSalePrice('')
        setDescription('')
        setCategory('')
        setBrand('')
        setStock('')
        setUploadedImageUrl('')
        setImageFile('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoadingAdd(true)

        const formData = {
            image: uploadedImageUrl,
            title,
            price,
            salePrice,
            description,
            category,
            brand,
            stock
        }
        // console.log("submit", formData);

        if (actonButtonText === 'Add') {
            const product = await addProduct(formData)

            if (product) {
                // console.log("response", product.data);

                setTitle('')
                setPrice('')
                setSalePrice('')
                setDescription('')
                setCategory('')
                setBrand('')
                setStock('')
                setUploadedImageUrl('')
                setImageFile('')

                fetchAllProducts()
                toast({
                    title: "Product added successfully."
                })
            }
        } else if (actonButtonText === 'Update') {

            const updatedProduct = await updateProduct(currentEditProduct._id, formData)

            if (updatedProduct) {
                // console.log(updatedProduct.data);
                setTitle('')
                setPrice('')
                setSalePrice('')
                setDescription('')
                setCategory('')
                setBrand('')
                setStock('')
                setUploadedImageUrl('')
                setImageFile('')

                fetchAllProducts()
                toast({
                    title: "Product updated successfully."
                })
            }
        }
        setLoadingAdd(false)
    };


    return (
        <Dialog open={openPopover} onOpenChange={setOpenPopover} className="w-full" >
            <DialogTrigger className=' flex justify-end'>
                <Button onClick={handleButtonClick} className="flex items-center gap-2">
                    <MdAdd className='text-2xl' />
                    <span>Add New Products</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[700px]  ">
                <DialogTitle>
                <h1 className='col-span-full h-fit text-lg font-semibold'>Add New Product</h1>
                </DialogTitle>
                <form onSubmit={handleSubmit} className="h-[65vh] grid grid-cols-[60%_38%] justify-between">
                    <div className="h-fit grid grid-cols-2 gap-2 ">
                        <div className="col-span-2">
                            <Label htmlFor="title" className="text-lg" >Title</Label>
                            <Input name="title" type="text" id="title" placeholder="Enter Product title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="">
                            <Label htmlFor="price" className="text-lg" >Price</Label>
                            <Input name="price" type="text" id="price" placeholder="Enter Product price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="">
                            <Label htmlFor="saleprice" className="text-lg" >Sale Price</Label>
                            <Input name="salePrice" type="text" id="saleprice" placeholder="Enter Product sale price" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                        </div>
                        <div className="col-span-full">
                            <Label htmlFor="desc" className="text-lg" >Description</Label>
                            <Textarea name='description' type="text" id="desc" placeholder="Enter Product Description" value={description} onChange={(e) => setDescription(e.target.value)} ></Textarea>
                        </div>
                        <div className="">
                            <Label htmlFor="category" className="text-lg" >Category</Label>
                            <Select id="category" name='category' value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="men">Men</SelectItem>
                                        <SelectItem value="women">Women</SelectItem>
                                        <SelectItem value="children">Children</SelectItem>
                                        <SelectItem value="accessory">Accessory</SelectItem>
                                        <SelectItem value="electronics">Electronics</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="">
                            <Label htmlFor="brand" className="text-lg" >Brand</Label>
                            <Select id="brand" name='brand' value={brand} onValueChange={setBrand}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Brand</SelectLabel>
                                        <SelectItem value="nike">Nike</SelectItem>
                                        <SelectItem value="adidas">Adidas</SelectItem>
                                        <SelectItem value="puma">Puma</SelectItem>
                                        <SelectItem value="zasira">Zasira</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="">
                            <Label htmlFor="stock" className="text-lg" >Total Stock</Label>
                            <Input name="stock" type="text" id="stock" placeholder="Enter Product Total Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                        </div>
                    </div>

                    <div className=" flex flex-col justify-between" >
                        <div className="">
                            <h1 className='col-span-full h-fit text-lg font-semibold mb-2'>Upload Image</h1>
                            {!imageFile ? (
                                <div onDragOver={handleDragOver} onDrop={handleDrop} className="">
                                    <Input name="imageFile" type="file" id="input" className="hidden" onChange={handleImageChange} />
                                    <Label htmlFor="input" >
                                        <div className="w-full h-60 border-dashed border-2 rounded-lg flex flex-col items-center justify-center ">
                                            <FiUploadCloud className='text-5xl' />
                                            <p className='capitalize mt-2 text-lg text-center'>Drag & Drop or Click to Choose File</p>
                                        </div>
                                    </Label>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 justify-between ">
                                    {imageUploading ? <LuLoader className='animate-spin text-xl' /> : <FaRegFileAlt className=' text-xl' />}
                                    <span>{imageFile.name}</span>
                                    <button onClick={() => setImageFile(null)}><IoCloseSharp /></button>
                                </div>
                            )}
                        </div>

                        <div className=" col-span-full  flex justify-end ">
                            <Button disabled={!isButtonEnable} type='submit' className="px-20 py-2">{loadingAdd ? <LuLoader className='animate-spin text-xl' /> : actonButtonText}</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ProductAddForm