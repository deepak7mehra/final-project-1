import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import next from "next";

export const GET = async () =>{

    return NextResponse.json({
        messgae:"hi there"
    })
    const session = await getServerSession(authOptions);
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }

    return NextResponse.json({
        message:"you are not logged in"
    },{
        status:403
    })
}