import express, { Request, Response, NextFunction } from "express";
import { PasteService } from "../../services/pastes/";

const router: express.Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { paste_id } = req.params;
        const paste = await new PasteService().get_paste(paste_id);

        if (!paste) {
            req.statusCode = 404;
            throw new Error("Paste not found");
        }

        return res.status(200).send(paste!.paste_content);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

export { router as get_raw_paste_router };
