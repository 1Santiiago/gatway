import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, BanknoteIcon, Building, ArrowRight } from "lucide-react";

const paymentMethodSchema = z.object({
  paymentType: z.string().min(1, { message: "Please select a payment method" }),
  accountNumber: z.string().optional(),
  bankName: z.string().optional(),
  bankBranch: z.string().optional(),
  documentId: z.string().optional(),
  holderName: z.string().optional(),
});

type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>;

interface OtherPaymentMethodsProps {
  onSubmit?: (values: PaymentMethodFormValues) => void;
  isLoading?: boolean;
}

const OtherPaymentMethods = ({
  onSubmit = () => {},
  isLoading = false,
}: OtherPaymentMethodsProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("bank_transfer");

  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      paymentType: "bank_transfer",
      accountNumber: "",
      bankName: "",
      bankBranch: "",
      documentId: "",
      holderName: "",
    },
  });

  const handleSubmit = (values: PaymentMethodFormValues) => {
    onSubmit(values);
  };

  const handlePaymentTypeChange = (value: string) => {
    setSelectedMethod(value);
    form.setValue("paymentType", value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Alternative Payment Methods
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handlePaymentTypeChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bank_transfer">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>Bank Transfer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="boleto">
                      <div className="flex items-center gap-2">
                        <BanknoteIcon className="h-4 w-4" />
                        <span>Boleto</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="voucher">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Voucher</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedMethod === "bank_transfer" && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-md">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankBranch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter branch number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {selectedMethod === "boleto" && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-md">
              <FormField
                control={form.control}
                name="documentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF/CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your CPF or CNPJ" {...field} />
                    </FormControl>
                    <FormDescription>
                      This information is required to generate your boleto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="holderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {selectedMethod === "voucher" && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-md">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="bg-gray-200 p-6 rounded-md mb-4 w-full max-w-md text-center">
                  <p className="text-gray-600 mb-2">
                    Enter your voucher code below
                  </p>
                  <Input
                    className="text-center font-mono text-lg uppercase"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    maxLength={19}
                  />
                </div>
                <FormDescription className="text-center">
                  Voucher codes can be purchased from our authorized retailers
                  or received as a gift.
                </FormDescription>
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">Processing...</span>
              ) : (
                <span className="flex items-center gap-2">
                  Continue to Payment
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OtherPaymentMethods;
