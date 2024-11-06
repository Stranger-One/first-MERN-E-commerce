import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { addNewFeature, deletefeatureImage, getAllFeatures } from '@/services/featuresServices'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { FiUploadCloud } from 'react-icons/fi'
import { IoCloseSharp } from 'react-icons/io5'
import { LuLoader } from 'react-icons/lu'

const Dashboard = () => {
  const [imageFile, setImageFile] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [loadingAdd, setLoadingAdd] = useState(false)
  const { toast } = useToast()

  const [featureImages, setFeatureImages] = useState([])


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
      console.log("response", response.data);
    }
    setImageUploading(false)
  };

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary()
  }, [imageFile])

  const fetchfeatureImages = async () => {
    const features = await getAllFeatures()
    setFeatureImages(features)
  }

  useEffect(()=>{
    fetchfeatureImages()
  }, [])

  const handleDelete = async (id) => {
    const response = await deletefeatureImage(id)
    if (response) {
      console.log(response);
      fetchfeatureImages()
    }
  };

  const handleSubmit = async () => {
    setLoadingAdd(true)

    const response = await addNewFeature(uploadedImageUrl)
    if (response) {
      console.log(response);
      setImageFile(null)
      setUploadedImageUrl(null)
      toast({
        title: 'Feature Image Uploaded successfully.'
      })
    fetchfeatureImages()

    }
    setLoadingAdd(false)
  }

  return (
    <section className='w-full'>
      <div className=" flex flex-col items-end w-full gap-2" >
        <div className="w-full">
          <h1 className='col-span-full h-fit text-lg font-semibold mb-2'>Upload feature Image</h1>
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
              <button onClick={() => {
                setImageFile(null)
                setUploadedImageUrl(null)
              }}><IoCloseSharp /></button>
            </div>
          )}
        </div>

        <div className=" col-span-full flex ">
          <Button onClick={handleSubmit} disabled={!uploadedImageUrl} type='submit' className="px-20 py-2">{loadingAdd ? <LuLoader className='animate-spin text-xl' /> : 'Upload Image'}</Button>
        </div>
      </div>
      <div className="w-full mt-2">
          {featureImages && featureImages.length > 0 ? featureImages.map((featureImage, index) => (
            <div key={index} className="w-full h-[250px] rounded-md relative mb-2 overflow-hidden">
              <img src={featureImage.image} alt="featureImage" className="w-full h-full object-cover "/>
              <Button onClick={()=>handleDelete(featureImage._id) } variant="outline" className="absolute top-2 right-2">Remove</Button>
            </div>
          )) : null}
      </div>
    </section>
  )
}

export default Dashboard