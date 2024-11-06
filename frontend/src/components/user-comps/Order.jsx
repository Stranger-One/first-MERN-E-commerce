import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { OrderDetailsDialog } from '..'
import { getOrders } from '@/services/orderServices'
import { useSelector } from 'react-redux'

const Order = () => {
  const userData = useSelector(state => state.auth.userData)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [myOrders, setMyOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [thisOrder, setThisOrder] = useState([])
  // const [totalAmount, setTotalAmount] = useState()



  const fetchAllMyOrders = async () => {
    setLoading(true)
    const orders = await getOrders(userData.id)
    if (orders) {
      // console.log(orders);
      setMyOrders(orders)

      // let total=0;
      // orders.forEach(order => {
      //   total += order.totalAmount
      // })
      // setTotalAmount(total)
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchAllMyOrders()
  }, [])

  return (
    <Card className=' '>
      <CardHeader>
        <h2 className='text-lg font-semibold'>Order History</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-[16px] '>Order ID</TableHead>
              <TableHead className='text-[16px] '>Order Date</TableHead>
              <TableHead className='text-[16px] '>Order Status</TableHead>
              <TableHead className='text-[16px] '>Order Price</TableHead>
              <TableHead className='text-[16px] '>Order details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="w-full">
                Loading...
              </TableRow>
            ) : myOrders?.length <= 0 ? (
              <TableRow className="w-full">
                No orders found
              </TableRow>
            ) : myOrders?.map((order, index) => (
              <TableRow key={index}>
                <TableCell className='text-[16px] font-semibold'>{order._id}</TableCell>
                <TableCell className='text-[16px]'>{order.createdAt.split('T')[0]}</TableCell>
                <TableCell className='text-[16px]'>{order.orderStatus}</TableCell>
                <TableCell className='text-[16px]'>${order.totalAmount}</TableCell>
                <TableCell className='text-[16px]'>
                  <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog} className=' ' >
                    <Button onClick={() => {
                      setOpenDetailsDialog(true)
                      setThisOrder(order)
                    }} >View Details</Button>

                    <OrderDetailsDialog order={thisOrder} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell className='text-[16px] font-semibold' colSpan={3}>Total</TableCell>
              <TableCell className=" text-[16px] font-semibold">${totalAmount}</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </CardContent>
    </Card>
  )
}

export default Order