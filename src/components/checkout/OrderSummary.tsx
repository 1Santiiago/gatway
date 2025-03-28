import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface OrderSummaryProps {
  items?: OrderItem[];
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  currency?: string;
  onCheckout?: () => void;
  className?: string;
}

const OrderSummary = ({
  items = [
    {
      id: "1",
      name: "Product 1",
      quantity: 2,
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
    },
    {
      id: "2",
      name: "Product 2",
      quantity: 1,
      price: 49.99,
      imageUrl:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&q=80",
    },
  ],
  subtotal = 109.97,
  shipping = 5.99,
  tax = 10.99,
  total = 126.95,
  currency = "$",
  onCheckout = () => console.log("Checkout clicked"),
  className,
}: OrderSummaryProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-6 w-full max-w-md",
        className,
      )}
    >
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.imageUrl && (
              <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="font-medium">
              {currency}
              {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>
            {currency}
            {shipping.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>
            {currency}
            {tax.toFixed(2)}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>Total</span>
        <span>
          {currency}
          {total.toFixed(2)}
        </span>
      </div>

      <Button onClick={onCheckout} className="w-full">
        Proceed to Checkout
      </Button>

      <div className="mt-4 text-xs text-center text-gray-500">
        By proceeding, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
};

export default OrderSummary;
