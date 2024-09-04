import prismaCliente from "../../prisma";

interface UserRequest{
    user_id: string;
    name: string;
    endereco: string;
}

class UpdateUserService{
    async execute({user_id, name, endereco}: UserRequest){
        try{
            const userAlreadyExists = await prismaCliente.user.findFirst({
                where:{
                    id: user_id,
                }
            })

            if(!userAlreadyExists){
                throw new Error("User Not Exists!");
            }

            const userUpdated = await prismaCliente.user.update({
                where:{
                   id: user_id 
                },
                data:{
                    name,
                    endereco,
                },
                select:{
                    name: true,
                    email: true,
                    endereco: true,
                }
            })

            return userUpdated;

        }catch(err){
            console.log(err);
            throw new Error("Error an update the user!")
        }
    }
}


export { UpdateUserService }