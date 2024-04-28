import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Transactions } from "../../../components/Transactions";
import { redirect } from "next/navigation";
import { where } from "firebase/firestore";


interface Trxn {
  time: Date;
  amount: number;
  positive: boolean;
  user: {
    id: number;
    name: string | null;
    email: string | null;
    number: string;
    password: string;
  } | null;
}


export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
  const transactionsRecieved = await getTransactionsRecieved();
  const transactionsSent = await getTransactionsSent();

  const transactions = [...transactionsRecieved, ...transactionsSent];
  transactions.sort((a, b) => b.time.getTime() - a.time.getTime());
  return (
    <div className="w-full">
      <Transactions transactions={transactions} />
    </div>
  );
}

async function getTransactionsRecieved() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id),
    },
  });

  const result: Trxn[] = [];

  for (const t of transactions) {
    const toUser = await prisma.user.findFirst({
      where: {
        id: t.fromUserId,
      },
    });

    result.push({
      time: t.timestamp,
      amount: t.amount,
      positive: true,
      user: toUser,
    });
  }

  return result;
}

async function getTransactionsSent(): Promise<Trxn[]> {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });

  const result: Trxn[] = [];

  for (const t of transactions) {
    const toUser = await prisma.user.findFirst({
      where: {
        id: t.toUserId,
      },
    });

    result.push({
      time: t.timestamp,
      amount: t.amount,
      positive: false,
      user: toUser,
    });
  }

  return result;
}