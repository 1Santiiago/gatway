import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface PaymentErrorProps {
  errorMessage?: string;
  errorCode?: string;
  onRetry?: () => void;
  onCancel?: () => void;
}

const PaymentError = ({
  errorMessage = "Your payment could not be processed at this time.",
  errorCode = "ERR-5001",
  onRetry = () => console.log("Retry payment"),
  onCancel = () => console.log("Cancel payment"),
}: PaymentErrorProps) => {
  return (
    <div className="w-full max-w-[1000px] mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 max-w-md">
          We encountered an issue while processing your payment. Please review
          the details below.
        </p>
      </div>

      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Error Details</AlertTitle>
        <AlertDescription>
          <p>{errorMessage}</p>
          <p className="text-xs mt-1">Error Code: {errorCode}</p>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-800 mb-2">What you can do:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Check your payment details and try again</li>
            <li>Ensure you have sufficient funds in your account</li>
            <li>Try a different payment method</li>
            <li>Contact your bank if the issue persists</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button
            onClick={onRetry}
            className="flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel Payment
          </Button>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Need help?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentError;
