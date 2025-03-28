import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, QrCode, Wallet } from "lucide-react";

export type PaymentMethod = "credit-card" | "pix" | "other";

interface PaymentMethodSelectorProps {
  selectedMethod?: PaymentMethod;
  onMethodChange?: (method: PaymentMethod) => void;
}

const PaymentMethodSelector = ({
  selectedMethod = "credit-card",
  onMethodChange = () => {},
}: PaymentMethodSelectorProps) => {
  const [activeMethod, setActiveMethod] =
    useState<PaymentMethod>(selectedMethod);

  const handleMethodChange = (method: PaymentMethod) => {
    setActiveMethod(method);
    onMethodChange(method);
  };

  return (
    <Card className="w-full bg-white shadow-sm border-gray-200">
      <CardContent className="p-0">
        <Tabs
          defaultValue={activeMethod}
          onValueChange={(value) => handleMethodChange(value as PaymentMethod)}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-3 h-16 rounded-none bg-gray-50">
            <TabsTrigger
              value="credit-card"
              className={cn(
                "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-white",
                "border-b-2 border-transparent data-[state=active]:border-primary",
              )}
            >
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-medium">Credit Card</span>
            </TabsTrigger>
            <TabsTrigger
              value="pix"
              className={cn(
                "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-white",
                "border-b-2 border-transparent data-[state=active]:border-primary",
              )}
            >
              <QrCode className="h-5 w-5" />
              <span className="text-sm font-medium">PIX</span>
            </TabsTrigger>
            <TabsTrigger
              value="other"
              className={cn(
                "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-white",
                "border-b-2 border-transparent data-[state=active]:border-primary",
              )}
            >
              <Wallet className="h-5 w-5" />
              <span className="text-sm font-medium">Other Methods</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit-card" className="p-4 mt-0">
            <div className="text-sm text-gray-500">
              Pay securely with your credit or debit card
            </div>
          </TabsContent>

          <TabsContent value="pix" className="p-4 mt-0">
            <div className="text-sm text-gray-500">
              Make an instant payment using PIX
            </div>
          </TabsContent>

          <TabsContent value="other" className="p-4 mt-0">
            <div className="text-sm text-gray-500">
              Choose from other available payment methods
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodSelector;
