import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe"

import {saveSubscription} from '../../utils/manageSubscriptions';


class WebhooksController{
    async handle(request: Request, response: Response){
        let event:Stripe.Event = request.body;

        let endpointSecret : 'whsec_38fb86ae39d68d618268bb3c39ab22d5b894fc197a6d393e8acc7a0399a31cc37'

        if(endpointSecret){
            const signature = request.headers['stripe-signature']
            try{
                event = stripe.webhooks.constructEvent(
                    request.body,
                    signature,
                    endpointSecret,
                )

            }catch(err){
                console.log("Webhook signature failed", err.message)
                return response.sendStatus(400);
            }
        }

        switch(event.type){
            case 'customer.subscription.deleted':
                const payment = event.data.object as Stripe.Subscription;

                await saveSubscription(
                    payment.id,
                    payment.customer.toString(),
                    false,
                    true
                )
                break;
            case 'customer.subscription.updated':
                const paymentIntent = event.data.object as Stripe.Subscription;

                await saveSubscription(
                    paymentIntent.id,
                    paymentIntent.customer.toString(),
                    false,
                    false
                )
                break;
            case 'checkout.session.completed':
                const checkoutSession = event.data.object as Stripe.Checkout.Session;

                await saveSubscription(
                    checkoutSession.subscription.toString(),
                    checkoutSession.customer.toString(),
                    true,
                    false

                )
                break;
            default:
                console.log(`Evento desconhecido ${event.type}`);
        }

        response.send();
            
    }
}

export { WebhooksController }