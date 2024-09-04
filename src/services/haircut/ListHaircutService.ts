import prismaCliente from "../../prisma";

interface HaicurtRequest{
    user_id: string;
    status: boolean | string;
    
}

class ListHaircutService{
    async execute({ user_id, status}: HaicurtRequest){

    }
} 


export { ListHaircutService }
    