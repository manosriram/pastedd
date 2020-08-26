import express, { Request, Response } from "express";
import { validator } from "../middlewares/validator";
import PasteService from "../services/paste_service";

const router: express.Router = express.Router();

router.post("/create_paste", validator, async (req: Request, res: Response) => {
    const {
        paste_name,
        paste_content,
        paste_syntax,
        paste_type,
        paste_expiry_at // No of days after creating paste
    } = req.body;

    new PasteService().create_paste({
        paste_name,
        paste_type,
        paste_content,
        paste_syntax,
        paste_expiry_at
    });
});

export { router as create_paste_router };
