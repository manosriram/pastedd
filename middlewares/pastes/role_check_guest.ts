import { Request, Response, NextFunction } from "express";
import { TYPE_PASTE } from "../../types/";

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
        if (req.session?.jwt) return next();

        // Limits Guest user.
        const { paste_content, paste_type } = req.body;

        // No private pastes.
        if (paste_type === TYPE_PASTE.PRIVATE) {
            update_status_code(req, 403);
            throw new Error("Sign in for private pastes");
        }
        const buffer_size = Buffer.byteLength(paste_content, "utf-8");
        if (buffer_size / 1000 >= 650) {
            throw new Error("Buffer Size exceeded");
        }

        next();
    } catch (err) {
        next(err);
    }
}
