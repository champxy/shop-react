import React, { useState } from "react";
import "../Stripe.css";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { saveOrder } from "../api/User";
import useShopStore from "../store/shop-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
    const token = useShopStore((state) => state.token);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const clearCartsuser = useShopStore((state) => state.actionClearCart);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const payload = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });
        console.log("payload",payload);
        if (payload.error) {
            setMessage(`Payment failed: ${payload.error.message}`);
            console.error('error');
            toast.error(`Payment failed: ${payload.error.message}`);
        }
        else if (payload.paymentIntent.status === "succeeded") {
            // setMessage("Payment successful!");
            console.log("Payment successful!");
            // create order
            saveOrder(token, payload).then((res) => {
                console.log(res);
                toast.success("Payment successful!");
                navigate("/user/history");
                clearCartsuser();
            }).catch((err) => {
                console.log(err);
            });
            console.log("yes i pay that", payload);
            
        }
        else {
            console.log("something wrong!");
            toast.error("Something wrong!");

        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <>
            <form
                className="space-y-6"
                id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button
                    className="stripe-button"
                    disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
        </>
    );
}