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
import { AdminOrderDetailsDialog, OrderDetailsDialog } from '..'
import { getAllOrders } from '@/services/orderServices'

const AdminOrder = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [allOrders, setAllOrders] = useState([])
  const [thisOrder, setThisOrder] = useState(null)


  const getAllUsersOrders = async () => {
    const resp = await getAllOrders()
    // console.log(resp)
    setAllOrders(resp)
  };

  useEffect(() => {
    getAllUsersOrders()
  }, [])

  return (
    <Card>
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
            {allOrders?.map((order, index) => (
              <TableRow key={index}>
                <TableCell className='text-[16px] font-semibold'>{order._id}</TableCell>
                <TableCell className='text-[16px]'>{order.createdAt.split('T')[0]}</TableCell>
                <TableCell className='text-[16px]'>{order.orderStatus}</TableCell>
                <TableCell className='text-[16px]'>${order.totalAmount}</TableCell>
                <TableCell className='text-[16px]'>
                  <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog} >
                    <Button onClick={() => {
                      setOpenDetailsDialog(true)
                      setThisOrder(order)
                    }} >View Details</Button>
                    <AdminOrderDetailsDialog 
                    order={thisOrder} 
                    getAllUsersOrders={getAllUsersOrders} 
                    setOpenDetailsDialog={setOpenDetailsDialog}
                    />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrder