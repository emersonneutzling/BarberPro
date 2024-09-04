import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUsercontroller } from "./controllers/user/UpdateUserController";
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";

import { isAuthenticted } from "./middlewares/isAuthenticted";

const router = Router();


// --- Rotas User ---

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticted, new DetailUserController().handle)
router.put('/users', isAuthenticted, new UpdateUsercontroller().handle)

// --- Rotas Haircut ---
router.post('/haircut', isAuthenticted, new CreateHaircutController().handle)
router.get('/haircuts', isAuthenticted, new ListHaircutController().handle )


export { router };