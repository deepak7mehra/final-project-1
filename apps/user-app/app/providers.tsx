"use client"

import { RecoilRoot } from "recoil"
import React from "react"
import { SessionProvider } from "next-auth/react"

export const Providers = ({children}:{children:React.ReactNode})=>{
    return <RecoilRoot>
        <SessionProvider>

            {children}
        </SessionProvider>
    </RecoilRoot>
}