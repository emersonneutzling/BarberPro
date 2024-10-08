import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUsercontroller } from "./controllers/user/UpdateUserController";

import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController";
import { CountHaircutController } from "./controllers/haircut/CountHaircutController";
import { DetailHaircutsController } from "./controllers/haircut/DetailHaircutsController";

import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";

import { SubscribeController } from "./controllers/subscripition/SubscribeController";
import { WebhooksController } from "./controllers/subscripition/WebhooksController"

import { isAuthenticted } from "./middlewares/isAuthenticted";

const router = Router();


// --- Rotas User ---

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticted, new DetailUserController().handle)
router.put('/users', isAuthenticted, new UpdateUsercontroller().handle)

// --- Rotas Haircut ---

router.post('/haircut', isAuthenticted, new CreateHaircutController().handle)
router.get('/haircuts', isAuthenticted, new ListHaircutController().handle)
router.put('/haircut', isAuthenticted, new UpdateHaircutController().handle)
router.get('/haircut/check', isAuthenticted, new CheckSubscriptionController().handle)
router.get('/haircut/count', isAuthenticted, new CountHaircutController().handle)
router.get('/haircut/detail', isAuthenticted, new DetailHaircutsController().handle)

// --- Rotas Schedule / Serviços ---

router.post('/schedule', isAuthenticted, new NewScheduleController().handle)
router.get('/schedules', isAuthenticted, new ListScheduleController().handle)
router.delete('/schedule/finish', isAuthenticted, new FinishScheduleController().handle) 

// --- Rotas Subscriptions / Pagamentos ---

router.post('/subscribe', isAuthenticted, new SubscribeController().handle)
router.post('/webhooks', new WebhooksController().handle)


export { router };