import express, { Request, Response, NextFunction } from "express";
import { PasteService } from "../../services/pastes/";
const router: express.Router = express.Router();

router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        const { user_name } = req.params;

        const service = new PasteService();
        const pastes = await service.get_user_paste(user_name);
        return res.json({ pastes: pastes || [] });
    }
);

export { router as get_user_pastes };
