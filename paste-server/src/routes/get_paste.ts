import express, { Request, Response, NextFunction } from "express";
import PasteService from "../services/paste_service";

const router: express.Router = express.Router();

router.get(
    "/p/:paste_id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paste_id } = req.params;
            const paste = await new PasteService().get_paste(paste_id);

            return res.status(200).json({
                paste,
                success: true
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
);

export { router as get_paste_router };
