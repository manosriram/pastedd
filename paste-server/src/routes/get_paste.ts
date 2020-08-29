import express, { Request, Response, NextFunction } from "express";
import PasteService from "../services/paste_service";
import { decrypt_buffer } from "../../utils/decrypt_buffer";
import { error } from "../middlewares/error";

const router: express.Router = express.Router();

router.get(
    "/p/:paste_id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paste_id } = req.params;
            const paste = await new PasteService().get_paste(paste_id);

            if (!paste) {
                res.statusCode = 404;
                next(new Error("Paste not found"));
            }

            const decrypted_buffer = decrypt_buffer(
                Buffer.from(paste!.paste_content)
            );
            paste!.paste_content = decrypted_buffer;
            return res.status(200).json({
                paste,
                success: true
            });
        } catch (err) {
            next(err);
        }
    }
);

export { router as get_paste_router };
