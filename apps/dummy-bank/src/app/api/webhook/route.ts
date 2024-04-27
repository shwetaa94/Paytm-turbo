import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import db from "@repo/db/client";

const paymentInformationSchema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.string(),
});

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Validate request body against the schema
        const paymentInformation = paymentInformationSchema.parse(req.body);

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
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
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid request body"
        });
    }
};
