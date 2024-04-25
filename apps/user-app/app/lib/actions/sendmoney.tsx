"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function sendMoney(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx) => {
        //lock the transaction 
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        //sender exists
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
        // check for sufficent balance
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }
        // update balance of sender as well as reciever
          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

        await tx.p2pTransfer.create({
            data:{
                fromUserId: Number(from),
                toUserId: Number(toUser.id),
                amount,
                timestamp: new Date()
            }
        })
    });
}