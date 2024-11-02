'use client'

import PaymentForm from '../components/PaymentForm';

const CheckoutPage: React.FC = () => {
  const handlePaymentSuccess = () => {
    console.log('Payment successful!');
    // Handle successful payment (e.g., redirect to success page)
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    // Handle payment error
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <PaymentForm
        amount={1000} // Amount in cents
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
};

export default CheckoutPage;