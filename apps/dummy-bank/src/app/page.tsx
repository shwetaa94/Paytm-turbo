"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    phoneNumber: '',
    amount: '',
    creditCardNumber: '',
    cvv: '',
    expiryDate: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Implement your payment logic here
  };

  return (
    <div className="w-[100%] flex">
      <div className="w-1/2 mx-10 px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Payment form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-gray-600">First name</label>
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
            <label htmlFor="phoneNumber" className="text-gray-600">Phone number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-gray-600">$ Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter $ amount"
              value={formData.amount}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="creditCardNumber" className="text-gray-600">Credit card number</label>
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
            <label htmlFor="cvv" className="text-gray-600">CVV</label>
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
            <label htmlFor="expiryDate" className="text-gray-600">Expiry date</label>
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
        <Image src="/hero-image.jpg" alt="My Image" width={600} height={900} />
      </div>
    </div>
  );
}
