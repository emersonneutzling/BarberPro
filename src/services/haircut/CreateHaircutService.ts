import prismaCliente from "../../prisma";

interface HaircutRequest{
    user_id: string;
    name: string;
    price: number;
}

// Verificar quantos modelos esse usuário já tem cadastrado.
// Verificar se ele é premium se não limitamos a quantidade de modelos para cadastrar.

class CreateHaircutService {
    async execute({user_id, name, price}: HaircutRequest){
        if(!name || !price){
            throw new Error("Error");
        }

        // Verificar quantos modelos esse usuário já tem cadastrado.

        const myHaircuts = await prismaCliente.haircut.count({
            where:{
                user_id: user_id
            }
        })

        const user = await prismaCliente.user.findFirst({
            where:{
                id: user_id,
            },
            include:{
                subscriptions: true,
            }
        })

        // Agora podemos criar nossa validação ou limite

        if(myHaircuts >= 3 && user?.subscriptions?.status !== 'active'){
            throw new Error("Not Authorized")
        }

        const haircut = await prismaCliente.haircut.create({
            data:{
                name: name,
                price: price,
                user_id: user_id,
            }

        })

        return haircut;
    }
}

export { CreateHaircutService }