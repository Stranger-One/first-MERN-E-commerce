import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AdminProductCard, ProductAddForm } from '@/components';
import { getAllProducts } from '@/services/productServices';




const Products = () => {

  const [openPopover, setOpenPopover] = useState(false)
  const [actonButtonText, setActonButtonText] = useState('Add')
  const [fetchingProducts, setFetchingProducts] = useState(true)
  const [allProducts, setAllProducts] = useState([])
  const [currentEditId, setCurrentEditId] = useState(null)
  const [currentEditProduct, setCurrentEditProduct] = useState({})

  



  const fetchAllProducts = async () => {
    const products = await getAllProducts()
    if (products) {
      // console.log(products);
      setAllProducts(products)
    }
    setFetchingProducts(false)
    setOpenPopover(false)
  };

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const formDetails = {
    openPopover, 
    setOpenPopover,
    actonButtonText, 
    setActonButtonText,
    fetchAllProducts,
    currentEditId,
    currentEditProduct
  }

  return (
    <div className="w-full ">
      <ProductAddForm {...formDetails} />


      {/* List of products */}
      <div className="w-full min-h-screen mt-10">
        <div className="productContainer grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!fetchingProducts ? (
            allProducts.length > 0 ? allProducts.map((product, index) => (
              <AdminProductCard fetchAllProducts={fetchAllProducts} setCurrentEditProduct={setCurrentEditProduct} setActonButtonText={setActonButtonText} setCurrentEditId={setCurrentEditId} setOpenPopover={setOpenPopover} key={index} product={product}/>
            )) : (
              <div className="col-span-full">
                <h2 className='capitalize text-2xl text-center'>no Products available</h2>
              </div>
            )
          ): (
            <div className="col-span-full">
              <h2 className='capitalize text-2xl text-center'>Loading...</h2>
            </div>
          ) }

        </div>

      </div>

    </div>
  )
}

export default Products