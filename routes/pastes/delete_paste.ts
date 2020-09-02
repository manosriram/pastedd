import express, { Request, Response, NextFunction } from "express";
import { PasteService } from "../../services/pastes/";

const router: express.Router = express.Router();

router.delete(
    "/:paste_id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paste_id } = req.params;
            if (!paste_id) {
                return res.status(400).json({
                    message: "Paste ID required",
                    success: false
                });
            }

            const paste = await new PasteService().delete_paste(paste_id);
            if (!paste) {
                req.statusCode = 404;
                throw new Error("Paste Not Found");
            }

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
