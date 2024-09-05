import prismaCliente from "../../prisma";

interface detailRequest{
    haircut_id: string;
}

class DetailHaircutsService{
    async execute({haircut_id}: detailRequest){
        
        const haircut = await prismaCliente.haircut.findFirst({
            where:{
                id: haircut_id
            }
        })

        return haircut;
    }
}

export { DetailHaircutsService }