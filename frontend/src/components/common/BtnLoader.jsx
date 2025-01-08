import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";

const BtnLoader = ({size=20}) => {
  return (
    <BiLoaderCircle size={size} className='animate-spin mx-auto' />
  )
}

export default BtnLoader