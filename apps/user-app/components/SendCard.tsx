"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { sendMoney } from "../app/lib/actions/sendmoney";
import toast from "react-hot-toast";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-56 w-96 pt-2 mr-4">
            <TextInput
              type="text"
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              type="text"
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  try {
                    await sendMoney(number, Number(amount) * 100);
                    toast.success("Funds transfer successfully!");
                  } catch (error: any) {
                    toast.error(
                      error.message
                        ? error.message
                        : "Error while transferring funds"
                    );
                  }
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
