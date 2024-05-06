"use client"
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/textinput'
import React, { useState } from 'react'
import p2pTransfer from '../app/lib/actions/p2pTransfer';
import toast, { Toaster } from 'react-hot-toast';

export default function SendCard() {
    const [number,setNumber] = useState<string>("");
    const [amount,setAmount] = useState<string>("");

    const successNotify = () => toast.success('payment successfull');
    const failureNotify = (message:string) => toast.error(message)


    async function handlep2pTransfer(){
      const response = await p2pTransfer(number,Number(amount)*100);
      const {success,message} = response;
      if (success){
        
        successNotify();
      }else{
        failureNotify(message);
      }

      

    }

  return (
    <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <Card title='Send' >
        <div className='p-5'>
        <div>
          
          <TextInput placeholder='123456789' onChange={(value)=>setNumber(value)} label='Number'/>
        </div>
        <div className='mt-4'>
          
          <TextInput placeholder='299' onChange={(value)=>setAmount(value)} label='Amount' />
        </div>
        <div className=' flex justify-center mt-4'>
        <Button  onClick={handlep2pTransfer}>
          <div>Send</div>
        </Button>

       
        

        </div>


        </div>
        
        

      </Card>
      <Toaster />
    </div>
  )
}
