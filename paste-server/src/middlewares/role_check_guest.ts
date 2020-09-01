import { Request, Response, NextFunction } from "express";
import { TYPE_PASTE } from "../config/Types/";

declare global {
    namespace Express {
        interface Request {
            current_user?: string;
        }
    }
}

function update_status_code(req: Request, status_code: number) {
    req.statusCode = status_code;
    return;
}

export function role_check_guest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // If user is signed-in.
        if (req.current_user) next();

        // Limits Guest user.
        const { paste_content, paste_type } = req.body;

        // No private pastes.
        if (paste_type === TYPE_PASTE.PRIVATE) {
            update_status_code(req, 403);
            throw new Error("Sign in for private pastes");
        }
        const buffer_size = Buffer.byteLength(paste_content, "utf-8");
        if (buffer_size / 1000 >= 1) {
            throw new Error("Buffer Size exceeded");
        }

        next();
    } catch (err) {
        next(err);
    }
}
