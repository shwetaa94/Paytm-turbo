import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/");
    }
    return <div className="w-full">
        <SendCard />
    </div>
}