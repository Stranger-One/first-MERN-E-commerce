import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuArrowDownUp } from 'react-icons/lu'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const SortBy = ({ sort, setSort }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    const toggleSort = (val) => {
        console.log(location);
        const categories = searchParams.get('category')
        const brands = searchParams.get('brand')
        const sort = searchParams.get('sort')

        console.log(categories, brands, sort);
        navigate(`/user/listing?category=${categories}&brand=${brands}&sort=${val}`)

        setSort(val)
    };

    useEffect(() => {
        const sort = searchParams.get('sort')
        if (sort) {
            setSort(sort)
        }

    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none border-none '>
                <button className='flex flex-nowrap gap-1 items-center px-2 py-1 border-[1px] border-black rounded-lg'>
                    <LuArrowDownUp />
                    <span className='text-sm'>Sort by</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <input type="radio" name='sort' id='lowToHigh' onChange={() => toggleSort('lowToHigh')} checked={sort === 'lowToHigh' ? true : false} />
                    <label htmlFor="lowToHigh">Price: Low to High</label>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <input type="radio" name='sort' id='highToLow' onChange={() => toggleSort('highToLow')} checked={sort === 'highToLow' ? true : false} />
                    <label htmlFor="highToLow">Price: High to Low</label>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <input type="radio" name='sort' id='aToZ' onChange={() => toggleSort('aToZ')} checked={sort === 'aToZ' ? true : false} />
                    <label htmlFor="aToZ">Title: A to Z</label>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <input type="radio" name='sort' id='zToA' onChange={() => toggleSort('zToA')} checked={sort === 'zToA' ? true : false} />
                    <label htmlFor="zToA">Title: Z to A</label>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortBy