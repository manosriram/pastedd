import express, { Request, Response, NextFunction } from "express";
import PasteService from "../services/paste_service";
import { EntityNotFoundError } from "../errors/entity_not_found";

const router: express.Router = express.Router();

router.post(
    "/p/update_paste/:paste_id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paste_id } = req.params;
            const { options } = req.body;
            console.log(options);
            const paste = await new PasteService().update_paste(
                paste_id,
                options
            );

            if (!paste) throw new EntityNotFoundError("Paste not found");

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

export { router as update_paste_router };
