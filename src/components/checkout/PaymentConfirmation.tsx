import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { CheckCircle, Download, Mail, Share2 } from "lucide-react";

interface PaymentConfirmationProps {
  orderId?: string;
  amount?: string;
  paymentMethod?: string;
  date?: string;
  email?: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
  onDownloadReceipt?: () => void;
  onSendEmail?: () => void;
  onShare?: () => void;
  onContinueShopping?: () => void;
}

const PaymentConfirmation = ({
  orderId = "ORD-12345-6789",
  amount = "$129.99",
  paymentMethod = "Credit Card (•••• 4242)",
  date = new Date().toLocaleDateString(),
  email = "customer@example.com",
  items = [
    { name: "Premium Subscription", quantity: 1, price: "$99.99" },
    { name: "Setup Fee", quantity: 1, price: "$30.00" },
  ],
  onDownloadReceipt = () => console.log("Download receipt"),
  onSendEmail = () => console.log("Send email"),
  onShare = () => console.log("Share"),
  onContinueShopping = () => console.log("Continue shopping"),
}: PaymentConfirmationProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 max-w-md">
          Your payment has been processed successfully. A confirmation has been
          sent to your email.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                <p className="text-gray-900 font-medium">{orderId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Payment Method
                </h3>
                <p className="text-gray-900 font-medium">{paymentMethod}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-gray-900 font-medium">{email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Amount Paid
                </h3>
                <p className="text-gray-900 font-medium text-lg">{amount}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="text-gray-900 font-medium">{date}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="text-gray-900">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-900 font-medium">{item.price}</p>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-medium">
              <p className="text-gray-900">Total</p>
              <p className="text-gray-900">{amount}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={onDownloadReceipt}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={onSendEmail}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Receipt
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={onShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center">
        <Button variant="default" onClick={onContinueShopping}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
