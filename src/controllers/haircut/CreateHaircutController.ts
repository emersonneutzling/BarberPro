import { Request, Response } from "express";
import { CreateHaircutService } from "../../services/haircut/CreateHaircutService";

class CreateHaircutController{
    async handle(request: Request, response: Response){
        const { name, price } = request.body;
        const user_id = request.user_id;

        const creatHaircutService = new CreateHaircutService();

        const haircut = await creatHaircutService.execute({
            user_id,
            name,
            price,
        })

        return response.json(haircut)
    }
}

export { CreateHaircutController }