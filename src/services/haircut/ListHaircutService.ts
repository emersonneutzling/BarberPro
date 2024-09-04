import prismaCliente from "../../prisma";

interface HaicurtRequest{
    user_id: string;
    status: boolean | string;
    
}

class ListHaircutService{
    async execute({ user_id, status}: HaicurtRequest){

        const haircut = await prismaCliente.haircut.findMany({
            where:{
                user_id: user_id,
                status: status === 'true' ? true : false
            }
        })

        return haircut;
    }
} 


export { ListHaircutService }
    