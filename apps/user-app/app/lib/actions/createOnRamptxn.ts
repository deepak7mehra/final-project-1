'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

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

    return {
        messgae:"on ramp transaction added"
    }
}