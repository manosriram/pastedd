import express, { Request, Response, NextFunction } from "express";
import PasteService from "../services/paste_service";
import { body } from "express-validator";

const router: express.Router = express.Router();

router.post(
    "/p/update_paste/:paste_id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paste_id } = req.params;

            if (
                !req.body ||
                !req.body.paste_content ||
                !req.body.paste_content.trim().length
            )
                throw new Error("Empty is paste not allowed");
            const paste = await new PasteService().update_paste(
                paste_id,
                req.body
            );

            if (!paste) {
                req.statusCode = 404;
                throw new Error("Paste not found");
            }

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
