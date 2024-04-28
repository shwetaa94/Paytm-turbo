// PaymentForm.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { sendOTP } from "validation/sendotp";
import { verifyOTP } from "validation/verifyotp";
import { ConfirmationResult, getAuth, RecaptchaVerifier } from "firebase/auth";
import FirbaseAuth from "validation/otpvalidation";
import firebaseConfig from "../../firebase/config";

interface formInterface {
  firstName: string;
  phoneNumber: string;
  creditCardNumber: string;
  cvv: string;
  expiryDate: string;
  otp: string;
}

declare global {
    interface Window {
    recaptchVerifier: any;
  }
}

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<formInterface>({
    firstName: "",
    phoneNumber: "",
    creditCardNumber: "",
    cvv: "",
    expiryDate: "",
    otp: "",
  });
  console.log("this is config file : ",firebaseConfig)

  const app= FirbaseAuth(firebaseConfig);
  const auth = getAuth(app);
  const [confirmations, setConfirmation] = useState<
    ConfirmationResult | undefined
  >();
  const [otpSent, setOtpSent] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryString = window.location.search;

    // Parse the query string to extract parameters
    const urlParams = new URLSearchParams(queryString);

    // Get the values of token, userId, and amount from the URL parameters
    const token = urlParams.get("token");
    const userId = urlParams.get("userId");
    const amount = urlParams.get("amount");

    if (confirmations) {
      const data = await verifyOTP(formData.otp, confirmations);
      if (data.success) {
        const response = await axios.post("http://localhost:3003/hdfcWebhook", {
          token: token?.toString(),
          user_identifier: userId?.toString(),
          amount: amount?.toString(),
        });

        if (response.data.message === "Captured") {
          toast.success("Transaction Successfull");
          new Promise((resolve, reject) => {
            resolve(
              setTimeout(
                () => (window.location.href = "http://localhost:3000/transfer"),
                4000
              )
            );
          });
        } else {
          console.log(response);
          toast.error("Error While Transferring money, Please Try Again Later");
        }
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto flex">
        <div className="w-1/2 mx-10 px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Payment form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-gray-600">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-gray-600">
                Phone number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {otpSent ? (
                <>
                  <label
                    htmlFor="otp"
                    className="text-gray-600 font-semibold my-1"
                  >
                    Enter OTP:
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="tel"
                    placeholder="Enter your OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              ) : (
                <>
                <button
                  className="text-blue-400 ml-[80%] w-[100px]"
                  onClick={async () => {
                    try {
                      const recaptcha = new RecaptchaVerifier(
                        auth,
                        "recaptcha-container",
                        {
                          size: "small",
                          callback: (response: any) => {},
                          "expired-callback": () => {},
                        }
                      );
                      const data = await sendOTP(
                        formData.phoneNumber,
                        recaptcha,
                        app
                      );
                      const { confirmation } = data;
                      setConfirmation(confirmation);
                      setOtpSent(true);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Send OTP
                </button>
                <div id="recaptcha-container" className="m-3 "></div>
                </>
              )}
              
            </div>
            <div className="flex flex-col">
              <label htmlFor="creditCardNumber" className="text-gray-600">
                Credit card number
              </label>
              <input
                id="creditCardNumber"
                name="creditCardNumber"
                type="text"
                placeholder="Enter your credit card number"
                value={formData.creditCardNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cvv" className="text-gray-600">
                CVV
              </label>
              <input
                id="cvv"
                name="cvv"
                type="text"
                placeholder="Enter CVV"
                value={formData.cvv}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="expiryDate" className="text-gray-600">
                Expiry date
              </label>
              <input
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder="Enter expiry date (MM/YY)"
                value={formData.expiryDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              PAY NOW
            </button>
          </form>
        </div>
        <div className="w-[50%] mt-20">
          <h1 className="text-4xl font-semibold m-4">Welcome to Dummy bank</h1>
          {/* Replace the below Image component with your actual image */}
          <img src="/hero-image.jpg" alt="My Image" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
