import { Appbar } from "../../../packages/ui/src/Appbar";

import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";
import p2pTransfer from "./lib/actions/p2pTransfer";



export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (session?.user){
    redirect("/dashboard")
  }
  else{
    redirect('/api/auth/signin')
  }


}
