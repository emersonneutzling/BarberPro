import prismaCliente from '../../prisma';

interface UserRequest{
    name:string;
    email:string;
    password:string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        if(!email){
            throw new Error("Email Incorreto");
            
        }

        const userAlreadyExists = await prismaCliente.user.findFirst({
            where:{
                email:email
            }
        })

        if(userAlreadyExists){
            throw new Error("User/Email já existe");
        }

        return { ok: "Teste Sucesso!" }
    }
}

export { CreateUserService }