"use client"
import { Card } from "@repo/ui/card";
import { useSession } from "next-auth/react";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {

    const session = useSession();
    console.log("seesion in client ",session)

    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
                Unlocked balance
            </div>
            <div>
                {amount / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Locked Balance
            </div>
            <div>
                {locked / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Balance
            </div>
            <div>
                {(locked + amount) / 100} INR
            </div>
        </div>
    </Card>
}