import React from 'react'
import accImg from '@/assets/account.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Address, Order } from '@/components'


const Account = () => {
  return (
    <main className='w-full'>
      <section className='w-full h-[300px] '>
        <img src={accImg} alt="" className='w-full h-full object-cover ' />
      </section>
      <section className='w-full p-10'>
        <div className="  ">
          <Tabs defaultValue="address" className="">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Order />
            </TabsContent>
            <TabsContent value="address">
              <section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 border-[1px] rounded-lg border-zinc-500 p-4'>
                <Address />
              </section>
            </TabsContent>
          </Tabs>

        </div>
      </section>
    </main>
  )
}

export default Account