import express, { Request, Response, NextFunction } from "express";
import { PasteService, PasteAccessService } from "../../services/pastes/";

const router: express.Router = express.Router();

router.post(
    "/:paste_id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paste_id } = req.params;
            const pas = await new PasteAccessService().can_edit(req, paste_id);
            if (!pas.success) throw new Error(pas.message);

            if (
                !req.body ||
                !req.body.paste_content ||
                !req.body.paste_content.trim().length
            )
                throw new Error("Paste shouldn't be empty");

            const paste = await new PasteService().update_paste(
                paste_id,
                req.body
            );

            if (!paste) {
                req.statusCode = 404;
                throw new Error("Paste not found");
            }

            return res.status(200).json({
                paste_id,
                message: "Paste updated!",
                success: true
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
);

export { router as update_paste_router };
