import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Transactions } from "../../../components/Transactions";
import { redirect } from "next/navigation";

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
  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    positive: true,
    
  }));
}

async function getTransactionsSent() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
    // Sort transactions based on date in ascending order (oldest first)
  transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    positive: false,
  }));
}