"use server";

import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  //   const token = await axios.get('https://api.hdfcbank.com/getToken,{amount:})
  const token = Math.random().toString();

  if (!userId) return { message: "User not logged in" };
  const tsx = await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount * 100,
      status: "Processing",
      startTime: new Date(),
      provider,
      token,
    },
  });
  return { message: " ON Ramp Transaction added succesfully",
            data:tsx
          };
}
