import express, { Request, Response, NextFunction } from "express";

// Middlewares
import { role_check_guest, validator } from "../middlewares";

//Services
import PasteService from "../services/paste_service";

const router: express.Router = express.Router();

router.post(
    "/p/create_paste",
    validator,
    role_check_guest,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                paste_name,
                paste_content,
                paste_syntax,
                paste_type,
                paste_expiry_at // No of days after creating paste
            } = req.body;

            const paste_service = new PasteService().create_paste({
                paste_name,
                paste_type,
                paste_content,
                paste_syntax,
                paste_expiry_at
            });
            const paste_id = await paste_service;

            return res.status(201).json({
                paste_id,
                message: "Paste Created!",
                success: true
            });
        } catch (err) {
            next(err);
        }
    }
);

export { router as create_paste_router };
