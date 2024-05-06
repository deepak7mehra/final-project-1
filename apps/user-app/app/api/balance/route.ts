import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res:NextApiResponse) {
    try {
        const url = new URL(req.url||"");
        const searchParams = new URLSearchParams(url.searchParams);
        const userid = searchParams.get("userid")

       
        if (!userid) {
            throw new Error("User ID not found in session.");
        }
        
        const balance = await prisma.balance.findFirst({
            where: {
                userId: Number(userid)
            }
        });

        if (!balance) {
            throw new Error("Balance not found for the user.");
        }

        return  Response.json({
            amount: balance.amount || 0,
            locked: balance.locked || 0
        });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({
            message : "an error occured",
            error
        })
    }
}