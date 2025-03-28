import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, CreditCard, ArrowRight } from "lucide-react";

const InitialScreen = () => {
  const navigate = useNavigate();

  const handleStartCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Welcome to Our Payment Checkout System
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Easy Checkout Process
              </CardTitle>
              <CardDescription>
                Complete your purchase quickly and securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our streamlined checkout process makes it easy to complete your
                purchase with just a few clicks. Choose from multiple payment
                methods and get instant confirmation.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Secure Payment Options
              </CardTitle>
              <CardDescription>
                Multiple payment methods to choose from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Pay with credit card, PIX, or other payment methods. All
                transactions are secure and your payment information is
                protected with industry-standard encryption.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md hover:shadow-lg transition-shadow max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Ready to proceed?</CardTitle>
            <CardDescription>Start your checkout process now</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={handleStartCheckout}
              className="w-full flex items-center justify-center gap-2"
            >
              Start Checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InitialScreen;
