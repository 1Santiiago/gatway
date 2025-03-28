import React from "react";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

interface CheckoutHeaderProps {
  logo?: React.ReactNode;
  orderSummary?: string;
  showSecureIndicator?: boolean;
}

const CheckoutHeader = ({
  logo = <div className="text-xl font-bold">Company Logo</div>,
  orderSummary = "Order #12345",
  showSecureIndicator = true,
}: CheckoutHeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center space-x-4">{logo}</div>

      <div className="text-sm md:text-base font-medium text-gray-700">
        {orderSummary}
      </div>

      {showSecureIndicator && (
        <div className="flex items-center text-green-600 text-sm">
          <Shield className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Secure Payment</span>
        </div>
      )}
    </header>
  );
};

export default CheckoutHeader;
