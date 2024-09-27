import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe"


class WebooksController{
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
                // Caso ele cancele sua assinatura vamos deletar a assinatura dele.
                break;
            case 'customer.subscription.updated':
                // Caso tenha alguma atualização na assinatura. 
                break;
            case 'checkout.session.completed':
                // Criar assinatura por que foi pago com sucesso.
                break;
            default:
                console.log(`Evento desconhecido ${event.type}`);
        }

        response.send();
            
    }
}

export { WebooksController }