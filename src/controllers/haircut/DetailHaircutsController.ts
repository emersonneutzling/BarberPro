import { Request, Response } from "express";
import { DetailHaircutsService} from "../../services/haircut/DetailHaircutsService";

class DetailHaircutsController{
    async handle(request: Request, response: Response){
        const haircut_id = request.query.haircut_id as string;

        const detailHaircuts = new DetailHaircutsService();
        
        const haircut = await detailHaircuts.execute({
            haircut_id
        })

        return response.json(haircut);
    }

    
}

export { DetailHaircutsController }