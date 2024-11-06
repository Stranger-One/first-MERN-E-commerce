import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const HomeFilter = ({listItem, header}) => {
    const navigate = useNavigate()
  return (
    <section className=' my-10 px-10 '>
        <h2 className='text-2xl font-semibold w-full text-center my-4'>{header}</h2>
        <div className="w-full grid grid-cols-5 gap-5">
          {listItem.map((item, index) => (
            <Card key={index} className="hover:shadow-lg cursor-pointer" onClick={() => navigate(item.path)}>
              <CardContent className="flex items-center flex-col justify-center gap-4 h-40 ">
                <item.icon className="h-12 w-12" />
                <h2 className='text-xl font-semibold '>{item.label}</h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
  )
}

export default HomeFilter