import React, { useState } from 'react'
import accImg from '@/assets/account.jpg'
import { Address, CartItem, CartWrapper, ConfirmOrder } from '@/components'
import { useSelector } from 'react-redux'
import { SelectSeparator } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FaArrowRight } from 'react-icons/fa'
import { useToast } from '@/hooks/use-toast'
import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'

const Checkout = () => {
  const cartProducts = useSelector(state => state.userGlobal.cartProducts)
  const [totalCheckoutAmount, setTotalCheckoutAmount] = useState(0)
  const selectedAddress = useSelector(state => state.userGlobal.selectedAddress)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const { toast } = useToast()

  const handleContinue = () => {
    if (selectedAddress == null) {
      toast({
        title: 'please select an address'
      })
      return
    }

    setOpenConfirmDialog(true)

  };

  return (

    <main className='w-full'>
      <section className='w-full h-[250px] '>
        <img src={accImg} className='w-full h-full object-cover ' />
      </section>
      <section className='w-full grid grid-cols-2 gap-6 p-10'>
        <section className='w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5  p-4'>
          <Address />
        </section>

        <div className="">
          <div className="w-full max-h-[80vh] overflow-auto ">
            {cartProducts.length > 0 ? cartProducts?.map((product, index) => (
              <CartItem key={index} product={product} setTotalCheckoutAmount={setTotalCheckoutAmount} />
            )) : (
              <div className="w-full flex items-center justify-center">
                <p className='text-lg font-bold'>No products in cart</p>
              </div>
            )}
          </div>
          <SelectSeparator className="border-[1px] my-4 " />
          <div className="mt-8">
            <div className="flex justify-between">
              <span className='font-bold'>Total</span>
              <span className='font-bold'>${totalCheckoutAmount}</span>
            </div>
          </div>
          <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
            
              <Button onClick={handleContinue} className="w-full mt-4 felx item-center gap-2"><span>Continue to billing</span> <FaArrowRight />
              </Button>
            <ConfirmOrder totalCheckoutAmount={totalCheckoutAmount} setOpenConfirmDialog={setOpenConfirmDialog} />
          </Dialog>
        </div>

      </section>

    </main>
  )
}

export default Checkout