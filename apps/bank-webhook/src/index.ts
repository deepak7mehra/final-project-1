import express from "express";
import bodyParser from 'body-parser';
import db from "@repo/db/client"
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    //TODO: check if onRampTransaction is processing

    
   const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)*100
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    } 

})

app.post("api/v1/addmoney",async (req,res)=>{

    try{
        const userInfo :{
            userId:number,
            amount:number,
            token:string,
            provider:string,
        } = {
            userId:req.body.userId,
            amount : req.body.amount,
            token:req.body.token,
            provider: req.body.provider
        }
        await db.onRampTransaction.create({
            data:{
                status:"Processing",
                token: userInfo.token,
                provider:userInfo.provider,
                amount :userInfo.amount,
                startTime: new Date(),
                userId:userInfo.userId
    
            }
        })

        return res.status(200).json({
            message:"your transcation is being processed"
        })

    }
    catch(e){
        return res.status(500).json({
            message:"an error occured"
        })
    }
    

})

app.listen(3003,()=>console.log("hi there"));