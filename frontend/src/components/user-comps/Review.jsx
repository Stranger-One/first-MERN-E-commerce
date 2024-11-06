import React from 'react'
import { FaStar } from "react-icons/fa6";

const Review = () => {
    return (
        <div className="grid grid-cols-[30px_auto] gap-2 p-2 mb-2 border-[1px] border-zinc-500 rounded-lg  ">
            <div className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center text-white ">
                U
            </div>
            <div className="flex flex-col gap-1">
                <h2 className='font-semibold'>username</h2>
                <div className="flex gap-1 flex-nowrap items-center">
                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                        <FaStar className='text-lg' />
                    </div>
                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                        <FaStar className='text-lg' />
                    </div>
                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                        <FaStar className='text-lg' />
                    </div>
                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                        <FaStar className='text-lg' />
                    </div>
                    <div className="w-7 h-7 cursor-pointer rounded-full border-[1px] border-zinc-500 flex items-center justify-center">
                        <FaStar className='text-lg' />
                    </div>
                    <span className='text-lg font-semibold'>5.0</span>
                </div>
                <p className='line-clamp-2 text-sm leading-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, dolorum dicta eius.</p>
            </div>
        </div>
    )
}

export default Review