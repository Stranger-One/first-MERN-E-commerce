import React, { useEffect, useState } from 'react'
import { HomeFilter, HomeSlide, ProductDetails } from '@/components'
import { Baby, Drill, Ribbon, Shirt, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCartProduct, setProducts } from '@/store/userGlobalSlice'
import { SiAdidas, SiHandm, SiNike, SiPuma, SiZara } from "react-icons/si";
import { getAllProducts } from '@/services/productServices'
import { getCart } from '@/services/cartServices'
import { getAllFeatures } from '@/services/featuresServices'



const Home = () => {
  const products = useSelector(state => state.userGlobal.products)
  const dispatch = useDispatch()

  const [openDetails, setOpenDetails] = useState(false)
  const [detailsId, setDetailsId] = useState(null)
  const userData = useSelector(state => state.auth.userData)
  const [slides, setSlides] = useState([])


  const featureProducts = [
    products[0],
    products[1],
    products[2],
    products[3],
    products[4],
    products[5],
  ]
  const categories = [
    {
      label: 'Men',
      path: "/user/listing/men",
      icon: Shirt
    },
    {
      label: 'Women',
      path: "/user/listing/women",
      icon: UserRound
    },
    {
      label: 'Children',
      path: "/user/listing/children",
      icon: Baby
    },
    {
      label: 'Footwear',
      path: "/user/listing/footwear",
      icon: Ribbon
    },
    {
      label: 'Accessory',
      path: "/user/listing/accessory",
      icon: Drill
    },
  ]
  const brands = [
    {
      label: 'Nike',
      icon: SiNike,
      path: "/user/listing/nike"
    },
    {
      label: 'Adidas',
      icon: SiAdidas,
      path: "/user/listing/adidas"
    },
    {
      label: 'Puma',
      icon: SiPuma,
      path: "/user/listing/puma"
    },
    {
      label: 'H&M',
      icon: SiHandm,
      path: "/user/listing/h&m"
    },
    {
      label: 'Zara',
      icon: SiZara,
      path: "/user/listing/zara"
    },
  ]

  const fetchAllProducts = async () => {
    const response = await getAllProducts()
    dispatch(setProducts(response))
  };

  const fetchCart = async () => {
    const response = await getCart(userData.id)
    // console.log(response);
    if (response) {
      dispatch(setCartProduct(response.products))
    }
  };

  const fetchfeatureImages = async () => {
    const featureImages = await getAllFeatures()
    const images = featureImages.map(item => item.image)
    setSlides(images)
  }

  useEffect(() => {
    fetchfeatureImages()
    fetchAllProducts()
    fetchCart()

  }, [])



  return (
    <main className='w-full'>
      <HomeSlide slides={slides} slidesPerView={1} children="img" />
      <HomeFilter listItem={categories} header={'Shop By Category'} />
      <HomeFilter listItem={brands} header={'Shop By Brand'} />
      {/* product details */}
      <ProductDetails detailsId={detailsId} openDetails={openDetails} setOpenDetails={setOpenDetails} />
      <section className='px-10 my-10 flex flex-col'>
        <h2 className='text-2xl font-semibold w-full text-center'>Featured Products</h2>
        <Link to={"/user/listing"} className='text-blue-700 hover:underline flex gap-2 items-center self-end mb-2'>see all products </Link>
        <HomeSlide
          slides={featureProducts}
          slidesPerView={5}
          // break640={1.4}
          // break768={3.2}
          // break1024={5.3}
          children="card"
          setDetailsId={setDetailsId}
          setOpenDetails={setOpenDetails}
        />
      </section>

    </main>
  )
}

export default Home