import express, { Request, Response, NextFunction } from "express";
import { signin_validator } from "../../middlewares/auth/";
import { AuthService } from "../../services/auth/";
const router: express.Router = express.Router();

// @ -> /u/signin
router.post(
    "/",
    signin_validator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_name, password } = req.body;

            const service = new AuthService();
            const auth_service = await service.sign_in(
                user_name,
                password,
                req
            );
            const signin_service = auth_service;

            const is_logged_in = signin_service.success;
            if (!is_logged_in) return next(new Error(signin_service.message));
            else
                return res.status(200).json({
                    message: signin_service.message,
                    success: signin_service.success
                });
        } catch (err) {
            next(err);
        }
    }
);

export { router as signin_router };
