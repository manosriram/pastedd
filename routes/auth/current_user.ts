import express, { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/auth/";
const router: express.Router = express.Router();

router.get(
    "/current_user",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auth_service = new AuthService();
            const user = await auth_service.current_user(req);

            return res.status(200).json({ user: user || null });
        } catch (err) {
            next(err);
        }
    }
);

export { router as current_user_router };
