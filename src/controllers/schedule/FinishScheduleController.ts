import { Request, Response } from "express";
import { FinishScheduleService } from "../../services/schedule/FinishScheduleService";

class FinishScheduleController{
    async handle(request: Request, response: Response){
        const user_id = request.user_id;
        const schedule_id = request.query.schedule_id as string;

        const finischSheduleService = new FinishScheduleService();

        const schedule = await finischSheduleService.execute({
            user_id,
            schedule_id
        })

        return response.json(schedule);

    }
    
}

export { FinishScheduleController }