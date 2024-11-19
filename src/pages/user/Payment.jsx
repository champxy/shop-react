import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/Stripe";
import useShopStore from "../../store/shop-store";
import CheckoutForm from "../../components/CheckoutForm";
const stripePromise = loadStripe("pk_test_51QDglxLBpPoBWH0DrgEMC7TMZmN02DTNHL7W5kA3iHk5K5Wd5U28lYtLXdG1Jtd9yy3pnSHbR3vHpCSkfEuZbZpO00YmxBAxd5");

const Payment = () => {
  const token = useShopStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");
  

  useEffect(() => {
    payment(token).then((res)=>{
      // console.log(res)
      setClientSecret(res.data.clientSecret)
    }).catch((err)=>{
      console.log(err);
    })
      
  } , []);


  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {clientSecret && (
        <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Payment