import express, { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/auth/";
const router: express.Router = express.Router();

// @ -> /u/:user_name
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_name } = req.params;
        console.log(user_name);

        const auth_service = new AuthService();
        const user = await auth_service.get_user(user_name);

        return res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
});

export { router as getuser_router };
