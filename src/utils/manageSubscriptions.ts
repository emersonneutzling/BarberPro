import {stripe} from './stripe';
import prismaCliente from '../prisma';

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction: boolean,
    deleteAction: boolean,
){
    const findUser = await prismaCliente.user.findFirst({
        where:{
            stripe_customer_id: customerId,
        },
        include:{
            subscriptions: true,
        }
    })

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: findUser.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
    }

    if(createAction){
        console.log(subscriptionData);
        
        try{

            await prismaCliente.subscription.create({
                data: subscriptionData
            })

        }catch(err){
            console.log("ERRO CREATE");
            console.log(err);
        }
    }else{
        // Se não estiver criando apenas atualizamos as informações.
        if(deleteAction){
            await prismaCliente.subscription.delete({
                where:{
                    id: subscriptionId,
                }
            })

            return;
        }

        try{

            await prismaCliente.subscription.update({
                where:{
                    id: subscriptionId,
                },
                data:{
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id,
                }
            })

        }catch(err){
            console.log("ERRO UPDATE HOOK");
            console.log(err);
        }
    }

}