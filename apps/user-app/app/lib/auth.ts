import db from "@repo/db/client";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt"


export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
            password: { label: "Password", type: "password" }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials:any)  {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    phone: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.phone
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        phone: credentials.phone,
                        password: hashedPassword,
                        email:"deepak7mher"
                    }
                });

                const userBalance = await db.balance.create({
                    data:{
                        userId:user.id,
                        amount:0,
                        locked:0
                    } 
                })
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.phone
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub 
            return session
        }
    }
  }