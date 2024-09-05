import prismaCliente from "../../prisma";

interface countRequest{
    user_id: string;
    
}

class CountHaircutsService{
    async execute({user_id}: countRequest){

        const count = await prismaCliente.haircut.count({
            where:{
                user_id: user_id
            }
        })

        return count;
    }
}

export { CountHaircutsService }