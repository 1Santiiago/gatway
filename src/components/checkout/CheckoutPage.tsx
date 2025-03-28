import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutHeader from "./CheckoutHeader";
import PaymentMethodSelector, { PaymentMethod } from "./PaymentMethodSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("credit-card");

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CheckoutHeader
        orderSummary="Complete your purchase"
        showSecureIndicator={true}
      />

      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={handleBackToHome}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Button>

        <h1 className="text-2xl font-bold mb-6">Payment Information</h1>

        <div className="space-y-6">
          <PaymentMethodSelector
            selectedMethod={selectedPaymentMethod}
            onMethodChange={handlePaymentMethodChange}
          />

          {/* Payment form content will be rendered here based on selected method */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {selectedPaymentMethod === "credit-card" && (
              <p className="text-gray-600">
                Credit card form will be displayed here
              </p>
            )}

            {selectedPaymentMethod === "pix" && (
              <p className="text-gray-600">
                PIX payment information will be displayed here
              </p>
            )}

            {selectedPaymentMethod === "other" && (
              <p className="text-gray-600">
                Other payment methods will be displayed here
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button className="px-8">Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
