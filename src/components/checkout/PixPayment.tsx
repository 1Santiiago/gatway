import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Clipboard, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PixPaymentProps {
  amount?: number;
  expiresIn?: number; // in minutes
  pixCode?: string;
  onCopyCode?: () => void;
  onPaymentComplete?: () => void;
}

const PixPayment = ({
  amount = 199.99,
  expiresIn = 30,
  pixCode = "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b028-f142082d7b230222Pagamento de Compra5204000053039865802BR5923Loja Virtual Exemplo6009Sao Paulo62070503***63041D14",
  onCopyCode = () => {},
  onPaymentComplete = () => {},
}: PixPaymentProps) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(expiresIn);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    onCopyCode();
    setTimeout(() => setCopied(false), 3000);
  };

  // In a real implementation, this would be connected to a payment verification system
  const simulatePayment = () => {
    onPaymentComplete();
  };

  return (
    <Card className="w-full max-w-[1000px] mx-auto bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Pagamento via PIX</CardTitle>
        <CardDescription>
          Escaneie o QR code ou copie o código PIX para realizar o pagamento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 w-[200px] h-[200px] flex items-center justify-center">
              {/* This would be a real QR code in production */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b028-f142082d7b230222Pagamento%20de%20Compra5204000053039865802BR5923Loja%20Virtual%20Exemplo6009Sao%20Paulo62070503***63041D14"
                alt="PIX QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>Expira em {timeLeft} minutos</span>
            </div>
          </div>

          <Separator className="md:h-40 h-px md:w-px w-full" />

          <div className="flex flex-col space-y-4 w-full max-w-md">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Código PIX</h3>
              <div className="relative">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm break-all overflow-hidden text-gray-600">
                  {pixCode}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "absolute right-2 top-2 h-8 px-2",
                    copied && "bg-green-50 text-green-600 border-green-200",
                  )}
                  onClick={handleCopyCode}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={16} className="mr-1" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Clipboard size={16} className="mr-1" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-1">
                Como pagar com PIX
              </h3>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Abra o aplicativo do seu banco</li>
                <li>Escolha a opção de pagamento via PIX</li>
                <li>Escaneie o QR code ou cole o código PIX</li>
                <li>Confirme as informações e finalize o pagamento</li>
              </ol>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Valor a pagar:</span>
              <span className="font-bold text-lg">R$ {amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-gray-500">
          Após o pagamento, a confirmação pode levar alguns instantes para ser
          processada.
        </div>
        {/* This button is just for demo purposes */}
        <Button
          variant="outline"
          className="w-full md:w-auto md:self-center"
          onClick={simulatePayment}
        >
          Simular pagamento concluído
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PixPayment;
