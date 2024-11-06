import React, { useEffect, useState } from 'react'
import { IoFilter } from 'react-icons/io5'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '../ui/label'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/store/userGlobalSlice'
import { getAllProducts } from '@/services/productServices'

const FilterProducts = ({setCategories, setBrands, fetchProducts}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const products = useSelector(state => state.userGlobal.products)

    const [men, setMen] = useState(false)
    const [women, setWomen] = useState(false)
    const [children, setChildren] = useState(false)
    const [footwear, setFootwear] = useState(false)
    const [accessory, setAccessory] = useState(false)

    const [nike, setNike] = useState(false)
    const [adidas, setAdidas] = useState(false)
    const [puma, setPuma] = useState(false)
    const [zasira, setZasira] = useState(false)

    const [searchParams] = useSearchParams()

    

    useEffect(() => {
        const currentCategoryParam = searchParams.get('category');
        if (currentCategoryParam) {
            const currentCategories = currentCategoryParam ? currentCategoryParam.split('~') : [];
            setCategories(currentCategories)
            currentCategories.map(cat => {
                switch (cat) {
                    case "men":
                        setMen(true);
                        break;
                    case "women":
                        setWomen(true);
                        break;
                    case "children":
                        setChildren(true);
                        break;
                    case "footwear":
                        setFootwear(true);
                        break;
                    case "accessory":
                        setAccessory(true);
                        break;

                    default:
                        break;
                }
            })
        }

        const currentBrandParam = searchParams.get('brand')
        if (currentBrandParam) {
            const currentBrands = currentBrandParam ? currentBrandParam.split('~') : [];
            setBrands(currentBrands)
            currentBrands.map(brand => {
                switch (brand) {
                    case 'nike':
                        setNike(true)
                        break;
                    case 'adidas':
                        setAdidas(true)
                        break;
                    case 'puma':
                        setPuma(true)
                        break;
                    case 'zasira':
                        setZasira(true)
                        break;

                    default:

                        break;
                }
            })
        }

    }, [])

    const toggleCategory = async (category) => {
        const currentBrandParam = searchParams.get('brand');
        const currentCategoryParam = searchParams.get('category');
        const currentCategories = currentCategoryParam ? currentCategoryParam.split('~') : [];

        const isActive = currentCategories.includes(category);
        const newCategories = isActive
            ? currentCategories.filter(cat => cat !== category) // Remove category
            : [...currentCategories, category]; // Add category

        navigate(`/user/listing${newCategories.length > 0 ? `?category=${newCategories.join('~')}${currentBrandParam ? `&brand=${currentBrandParam}` : ''}` : currentBrandParam ? `?brand=${currentBrandParam}` : ''}`)

        setCategories(newCategories)
        
    };

    const toggleBrand =  async (brand) => {
        const currentBrandParam = searchParams.get('brand');
        const currentCategoryParam = searchParams.get('category');
        const currentBrands = currentBrandParam ? currentBrandParam.split('~') : [];

        const isActive = currentBrands.includes(brand)
        const newBrands = isActive
            ? currentBrands.filter(brnd => brnd !== brand)  // Remove Brand
            : [...currentBrands, brand] // Add Brand

        navigate(`${currentCategoryParam ? `/user/listing?category=${currentCategoryParam}${newBrands.length > 0 ? `&brand=${newBrands.join('~')}` : ''}` : `${newBrands.length > 0 ? `/user/listing?brand=${newBrands.join('~')}` : '/user/listing'}`}`)

        setBrands(newBrands)
    };

    const filterOptions = {
        category: [
            {
                label: 'Men',
                checked: men,
                onChange: () => {
                    setMen(prev => !prev)
                    toggleCategory('men')
                }
            },
            {
                label: 'Women',
                checked: women,
                onChange: () => {
                    setWomen(prev => !prev)
                    toggleCategory('women')
                }
            },
            {
                label: 'Children',
                checked: children,
                onChange: () => {
                    setChildren(prev => !prev)
                    toggleCategory('children')
                }
            },
            {
                label: 'Footwear',
                checked: footwear,
                onChange: () => {
                    setFootwear(prev => !prev)
                    toggleCategory('footwear')
                }
            },
            {
                label: 'Accessory',
                checked: accessory,
                onChange: () => {
                    setAccessory(prev => !prev)
                    toggleCategory('accessory')
                }
            },

        ],
        brand: [

            {
                label: 'Nike',
                checked: nike,
                onChange: () => {
                    setNike(prev => !prev)
                    toggleBrand('nike')
                }
            },
            {
                label: 'Adidas', checked: adidas,
                onChange: () => {
                    setAdidas(prev => !prev)
                    toggleBrand('adidas')
                }
            },
            {
                label: 'Puma', checked: puma,
                onChange: () => {
                    setPuma(prev => !prev)
                    toggleBrand('puma')
                }
            },
            {
                label: 'Zasira', checked: zasira,
                onChange: () => {
                    setZasira(prev => !prev)
                    toggleBrand('zasira')
                }
            },
        ]
    }

    const checkFilters = () => {
        // console.log(location)
        const pathCategory = location.pathname.split('/')
        // console.log(pathCategory[pathCategory.length - 1])

        switch (pathCategory[pathCategory.length - 1]) {
            case 'men':
                setMen(true)
                setWomen(false)
                setChildren(false)
                setFootwear(false)
                setAccessory(false)
                break;
            case 'women':
                setMen(false)
                setWomen(true)
                setChildren(false)
                setFootwear(false)
                setAccessory(false)
                break;
            case 'children':
                setMen(false)
                setWomen(false)
                setChildren(true)
                setFootwear(false)
                setAccessory(false)
                break;
            case 'footwear':
                setMen(false)
                setWomen(false)
                setChildren(false)
                setFootwear(true)
                setAccessory(false)
                break;
            case 'accessory':
                setMen(false)
                setWomen(false)
                setChildren(false)
                setFootwear(false)
                setAccessory(true)
                break;
        }
    };

    const clearFilter = () => {

        setMen(false)
        setWomen(false)
        setChildren(false)
        setFootwear(false)
        setAccessory(false)

        setNike(false)
        setAdidas(false)
        setPuma(false)
        setZasira(false)

        setBrands([])
        setCategories([])

        navigate('/user/listing')
        fetchProducts()
    };

    // const filterProduct = () => {
    //     const filteredProducts = products.filter(product => {
    //         if (!men && !women && !children && !footwear && !accessory && !nike && !adidas && !puma && !zasira) return true

    //         const categoryMatch =
    //             (men && product.category === "men") ||
    //             (women && product.category === "women") ||
    //             (children && product.category === "children") ||
    //             (footwear && product.category === "footwear") ||
    //             (accessory && product.category === "accessory")

    //         const brandMatch =
    //             (nike && product.brand === "nike") ||
    //             (adidas && product.brand === "adidas") ||
    //             (puma && product.brand === "puma") ||
    //             (zasira && product.brand === "zasira")

    //         return (categoryMatch || brandMatch)
    //     })
    //     dispatch(setProducts(filteredProducts))
    // };

    useEffect(() => {
        checkFilters()
    }, [location])


    // useEffect(() => {
    //     filterProduct()
    // }, [men, women, children, footwear, accessory, nike, adidas, puma, zasira])


    return (
        <div className='p-4'>
            <div className="flex items-center justify-between border-b-2 p-2">
                <div className="flex items-center gap-2">
                    <IoFilter />
                    <h2 className='font-semibold'>Filter</h2>
                </div>
                <button onClick={clearFilter} className=' hover:underline font-semibold' >Clear filter</button>
            </div>
            <div className="">
                {Object.keys(filterOptions).map((filterHeader, index) => (
                    <div key={index} className="flex flex-col gap-2 py-2 border-b-2">
                        <h3 className='font-semibold capitalize'>{filterHeader}</h3>
                        <ul className="flex flex-col gap-1 pl-2">
                            {filterOptions[filterHeader].map((option, index) => (
                                <li key={index} className='flex items-center gap-1'>
                                    <Checkbox id={option.label}
                                        checked={option.checked}
                                        onCheckedChange={option.onChange} />
                                    <Label htmlFor={option.label} className='cursor-pointer'>{option.label}</Label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default FilterProducts