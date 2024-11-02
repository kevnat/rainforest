'use client'

import { useState, useEffect } from 'react';
import Script from 'next/script';

interface PaymentFormProps {
  amount: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Rainforest Payment when the script loads
    const initializePayment = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });

        const data = await response.json();

        // Initialize Rainforest Payment
        const rainforestPayment = (window as any).RainforestPayment;
        if (rainforestPayment) {
          rainforestPayment.initialize({
            publicKey: data.publicKey,
            amount: data.amount,
            currency: data.currency,
            onSuccess: async (result: any) => {
              console.log('Payment successful:', result);
            },
            onError: (err: any) => {
              setLoading(false);
              setError(err.message);
              onError?.(err);
            },
          });
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    initializePayment();
  }, [amount, onSuccess, onError]);

  return (
    <div className="payment-form">
      <Script
        type="module"
        src="https://static.rainforestpay.com/sandbox.payment.js"
        strategy="afterInteractive"
      />

      {error && <div className="error">{error}</div>}
      
      {/* Payment form container */}
      <div id="rainforest-payment-container"></div>

      <style jsx>{`
        .payment-form {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
        }
        .error {
          color: red;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default PaymentForm;