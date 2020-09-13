import express, { Request, Response, NextFunction } from "express";

// Middlewares
import {
    role_check_guest,
    can_paste,
    validator
} from "../../middlewares/pastes/";

//Services
import { PasteService } from "../../services/pastes/";
import { encrypt_buffer } from "../../utils/";

const router: express.Router = express.Router();

router.get(
    "/:paste_id",
    validator,
    role_check_guest,
    can_paste,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { paste_id } = req.params;

            // 1. Verify Paste is not-null.
            // 2. Verify user is signed-in and can-clone

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

export { router as clonepaste_router };
