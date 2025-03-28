import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Calendar, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number cannot exceed 19 digits"),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  expiryMonth: z.string().min(1, "Month is required"),
  expiryYear: z.string().min(1, "Year is required"),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV cannot exceed 4 digits"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreditCardFormProps {
  onSubmit?: (values: FormValues) => void;
  isProcessing?: boolean;
}

const CreditCardForm = ({
  onSubmit = (values) => console.log("Form submitted:", values),
  isProcessing = false,
}: CreditCardFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      value: month.toString().padStart(2, "0"),
      label: month.toString().padStart(2, "0"),
    };
  });

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i;
    return { value: year.toString(), label: year.toString() };
  });

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Format with spaces every 4 digits
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Credit Card Payment
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Card Number */}
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                      className="pl-10"
                      maxLength={19}
                    />
                  </FormControl>
                  <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cardholder Name */}
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div className="space-y-2">
              <FormLabel>Expiry Date</FormLabel>
              <div className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="YY" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {(form.formState.errors.expiryMonth ||
                form.formState.errors.expiryYear) && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {form.formState.errors.expiryMonth?.message ||
                    form.formState.errors.expiryYear?.message}
                </p>
              )}
            </div>

            {/* CVV */}
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full py-6"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Your payment information is secure and encrypted</p>
      </div>
    </div>
  );
};

export default CreditCardForm;
