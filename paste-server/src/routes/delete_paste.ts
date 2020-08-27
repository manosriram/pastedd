import express, { Request, Response, NextFunction } from "express";
import PasteService from "../services/paste_service";
import { EntityNotFoundError } from "../errors/entity_not_found";

const router: express.Router = express.Router();

router.delete(
    "/p/:paste_id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paste_id } = req.params;
            if (!paste_id) {
                return res.status(400).json({
                    message: "Paste ID required",
                    success: false
                });
            }

            const ll = await new PasteService().delete_paste(paste_id);
            if (!ll) throw new EntityNotFoundError("Paste not found");

            return res.status(200).json({
                message: "Paste deleted.",
                success: true
            });
        } catch (err) {
            next(err);
        }
    }
);

export { router as delete_paste_router };
