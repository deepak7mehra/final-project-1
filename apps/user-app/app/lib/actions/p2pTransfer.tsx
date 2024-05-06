"use server"
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { redirect } from 'next/navigation';
import db from "@repo/db/client";
import { error } from 'console';

export default async function p2pTransfer(to:string,amount:number) {
   
    const session = await getServerSession(authOptions);
   
    const from = session?.user?.id;
    if (!from){
       return {
        success : false,
        message : "error while sending msg"
       }
    }

    const toUser = await db.user.findFirst({
        where:{
            phone : to 
        }
    })
    
    if (!toUser){
        console.log("can not find user")
        return {
            success : false,
            message:"user not found"
        }
    }

    try {
        await db.$transaction(async (tx)=>{
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            const fromBalance = await tx.balance.findUnique({
                where: {userId:Number(from)}
            })
    
            if (!fromBalance ||  fromBalance.amount < amount){
                throw new Error("Insufficent Balance")
            }
    
            await tx.balance.update({
                where:{userId:Number(from)},
                data:{amount : {decrement : amount} }
            })
    
            await tx.balance.update({
                where : {userId : toUser.id},
                data : {amount : {increment : amount}}
            })
        })
        return {
            success : true,
            message : "money transfered"
        }
        
    } catch (error) {
        console.log(error);
        return{
            success : false,
            message : "internal error"
        }
        
    }

    
    

    
    


}
