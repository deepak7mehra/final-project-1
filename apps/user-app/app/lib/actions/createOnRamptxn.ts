'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export async function createOnRampTransaction(amount: number,provider: string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session.user.id;
    if (!userId) {
        return {
            message : "User not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            userId:Number(userId),
            amount:amount*100,
            provider,
            startTime : new Date(),
            token,
            status:"Processing"
        }
    })

    await sleep(3000);

    let stringAmount = String(amount);

    const requestBody : {
        token:string,
        amount:string,
        user_identifier:string
    } = {
        token,
         amount:stringAmount,
        user_identifier:userId
    }

    await fetch("http://localhost:3003/hdfcWebhook",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'    
        },
        body : JSON.stringify(requestBody)
    })

    return {
        messgae:"on ramp transaction added"
    }
}