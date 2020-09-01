import express, { Request, Response, NextFunction } from "express";

// Middlewares
import {
    role_check_user,
    role_check_guest,
    validator
} from "../../middlewares/pastes/";

//Services
import { PasteService } from "../../services/pastes/";
import { encrypt_buffer } from "../../utils/";

const router: express.Router = express.Router();

router.post(
    "/create_paste",
    validator,
    role_check_guest,
    // role_check_user,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                paste_name,
                paste_content,
                paste_syntax,
                paste_type,
                paste_expiry_at // No of days after creating paste
            } = req.body;

            const encrypted_buffer = encrypt_buffer(paste_content);
            const paste_service = new PasteService().create_paste({
                paste_name,
                paste_type,
                paste_content: encrypted_buffer,
                paste_syntax,
                paste_expiry_at
            });
            const paste_id = await paste_service;

            // paste.user -> UserID/email/user_name
            // user_pasted(user, type_of_paste)

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
