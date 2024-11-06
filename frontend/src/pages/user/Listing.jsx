import { FilterProducts, ProductDetails, SortBy } from '@/components'
import ProductCard from '@/components/user-comps/ProductCard';
import { getCart } from '@/services/cartServices';
import { getAllProducts } from '@/services/productServices';
import { setCartProduct, setPageLoading, setProducts } from '@/store/userGlobalSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';



const Listing = () => {
  const dispatch = useDispatch()

  const [openDetails, setOpenDetails] = useState(false)
  const [detailsId, setDetailsId] = useState(null)
  const pageLoading = useSelector(state => state.userGlobal.pageLoading)
  const userData = useSelector(state => state.auth.userData)
  const products = useSelector(state => state.userGlobal.products)

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [sort, setSort] = useState('')

  const fetchProducts = async () => {
    const response = await getAllProducts(categories, brands, sort)
    // console.log(response);
    dispatch(setProducts(response))
    dispatch(setPageLoading(false))
  };

  useEffect(()=>{
    // console.log(categories, brands, sort);
    fetchProducts()
  }, [categories, brands, sort])

  const fetchCart = async () => {
    const repsonse = await getCart(userData.id)
    // console.log(repsonse);
    dispatch(setCartProduct(repsonse.products))
  };

  useEffect(() => {
    fetchCart()
    setPageLoading(false)
  }, [])



  return (
    <div className='w-full grid grid-cols-[250px_auto] ' style={{ height: `calc(100vh - 48px)` }}>
      {/* fileter */}
      <FilterProducts fetchProducts={fetchProducts} setCategories={setCategories} setBrands={setBrands} />

      {/* products */}
      <div className="h-full w-full overflow-auto border-l-2 ">
        <div className="h-14 w-full flex justify-between items-center px-4 border-b-2 ">
          <h2 className='text-lg font-bold '>All Products</h2>
          <div className="flex items-center gap-4">
            <h3 className='font-semibold'><span>{products?.length}</span> Products</h3>
            <SortBy sort={sort} setSort={setSort} />
          </div>
        </div>
        {/* product details */}
        <ProductDetails detailsId={detailsId} openDetails={openDetails} setOpenDetails={setOpenDetails} />
        <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">

          {pageLoading ? (
            <div className="w-full col-span-full h-[200px] flex justify-center items-center">
              Loading...
            </div>
          ) : products?.length > 0 ? products?.map(product =>
            <ProductCard key={product._id} setDetailsId={setDetailsId} product={product} setOpenDetails={setOpenDetails} />
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <h2 className='text-3xl font-bold text-center py-4'>No products found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Listing