
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Check } from "lucide-react";
import { toast } from "sonner";

type SubscriptionSettingsProps = {
  currency: {
    code: string;
    symbol: string;
  };
  calculatePrice: (priceInRub: number) => string | number;
  handleSubscribe: (plan: string) => void;
};

const SubscriptionSettings = ({ currency, calculatePrice, handleSubscribe }: SubscriptionSettingsProps) => {
  const { t, language } = useLanguage();
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const openPaymentDialog = (plan: string, price: string | number) => {
    setCurrentPlan(plan);
    setCurrentPrice(String(price));
    setPaymentDialogOpen(true);
    setPaymentSuccess(false);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Display success message
      setTimeout(() => {
        setPaymentDialogOpen(false);
        toast.success(language === 'ru' ? "Подписка оформлена" : 
                      language === 'es' ? "Suscripción activada" : 
                      "Subscription activated", {
          description: language === 'ru' 
            ? `Вы успешно оформили подписку ${currentPlan}` 
            : language === 'es'
              ? `Ha suscrito con éxito al plan ${currentPlan}`
              : `You have successfully subscribed to ${currentPlan}`
        });
      }, 2000);
    }, 2000);
  };

  const renderFeature = (text: string) => (
    <div className="flex items-start gap-2 mb-2">
      <span className="text-primary mt-0.5">✓</span>
      <span className="text-sm">{text}</span>
    </div>
  );

  return (
    <>
      <Card className="mb-6" id="billing">
        <CardHeader>
          <CardTitle>{t.subscriptionBilling}</CardTitle>
          <CardDescription>{t.manageSubscription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 border rounded-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium">{t.currentPlanTitle}</h4>
                <p className="text-sm text-muted-foreground">{t.freePlan}</p>
              </div>
              <Badge variant="outline">{t.active}</Badge>
            </div>
            <div className="space-y-1">
              {renderFeature(t.basicTracking)}
              {renderFeature(t.limitedHistory)}
              {renderFeature(t.basicReports)}
            </div>
          </div>

          <h4 className="font-medium mb-4">{t.availablePlans}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
              <h5 className="font-medium mb-2">{t.premiumPlan}</h5>
              <p className="text-xl font-bold mb-2">{currency.symbol}{calculatePrice(299)}<span className="text-sm font-normal text-muted-foreground">/{t.month}</span></p>
              <div className="space-y-0 mb-4">
                {renderFeature(t.advancedAnalytics)}
                {renderFeature(t.personalCoaching)}
                {renderFeature(t.unlimitedAccess)}
                {renderFeature(t.noAds)}
              </div>
              <Button 
                className="w-full" 
                onClick={() => openPaymentDialog(t.premiumPlan, calculatePrice(299))}
              >
                {t.subscribeTo} {t.premiumPlan}
              </Button>
            </div>

            <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
              <h5 className="font-medium mb-2">{t.yearlyPlan}</h5>
              <p className="text-xl font-bold mb-2">{currency.symbol}{calculatePrice(2499)}<span className="text-sm font-normal text-muted-foreground">/{t.year}</span></p>
              <Badge className="mb-2">{t.savings}</Badge>
              <div className="space-y-0 mb-4">
                {renderFeature(t.premiumFeatures)}
                {renderFeature(t.prioritySupport)}
                {renderFeature(t.dataExport)}
              </div>
              <Button 
                className="w-full" 
                onClick={() => openPaymentDialog(t.yearlyPlan, calculatePrice(2499))}
              >
                {t.subscribeTo} {t.yearlyPlan}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'ru' ? "Оформление подписки" : 
               language === 'es' ? "Checkout de suscripción" : 
               "Subscription Checkout"}
            </DialogTitle>
            <DialogDescription>
              {language === 'ru' 
                ? `Подписка на ${currentPlan} - ${currency.symbol}${currentPrice}` 
                : language === 'es'
                  ? `Suscripción a ${currentPlan} - ${currency.symbol}${currentPrice}`
                  : `Subscribe to ${currentPlan} - ${currency.symbol}${currentPrice}`}
            </DialogDescription>
          </DialogHeader>
          
          {paymentSuccess ? (
            <div className="py-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {language === 'ru' ? "Платеж успешно выполнен!" : 
                 language === 'es' ? "¡Pago exitoso!" : 
                 "Payment Successful!"}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ru' 
                  ? "Ваша подписка активирована. Спасибо за покупку!" 
                  : language === 'es'
                    ? "Su suscripción ha sido activada. ¡Gracias por su compra!"
                    : "Your subscription has been activated. Thank you for your purchase!"}
              </p>
            </div>
          ) : (
            <form onSubmit={handlePaymentSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cardName" className="text-right">
                    {language === 'ru' ? "Имя на карте" : 
                     language === 'es' ? "Nombre en la tarjeta" : 
                     "Name on Card"}
                  </Label>
                  <Input
                    id="cardName"
                    placeholder={language === 'ru' ? "Иван Иванов" : 
                                  language === 'es' ? "Juan Pérez" : 
                                  "John Smith"}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cardNumber" className="text-right">
                    {language === 'ru' ? "Номер карты" : 
                     language === 'es' ? "Número de tarjeta" : 
                     "Card Number"}
                  </Label>
                  <div className="col-span-3 relative">
                    <Input
                      id="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      className="pl-10"
                      required
                      maxLength={19}
                      pattern="[0-9\s]{13,19}"
                    />
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiry" className="text-right">
                    {language === 'ru' ? "Срок действия" : 
                     language === 'es' ? "Fecha de caducidad" : 
                     "Expiry Date"}
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="col-span-1"
                    required
                    maxLength={5}
                  />
                  <Label htmlFor="cvc" className="text-right">
                    CVC
                  </Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="col-span-1"
                    required
                    maxLength={3}
                    pattern="[0-9]{3,4}"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                  {language === 'ru' ? "Отмена" : 
                   language === 'es' ? "Cancelar" : 
                   "Cancel"}
                </Button>
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing 
                    ? (language === 'ru' ? "Обработка..." : 
                       language === 'es' ? "Procesando..." : 
                       "Processing...") 
                    : (language === 'ru' ? "Оплатить" : 
                       language === 'es' ? "Pagar ahora" : 
                       "Pay Now")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionSettings;
