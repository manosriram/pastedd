import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const router: express.Router = express.Router();

router.get(
    "/user_metadata",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.session?.jwt) return res.status(200).json({ user: null });

            const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
            return res.status(200).json({ user: payload });
        } catch (err) {
            next(err);
        }
    }
);

export { router as usermetadata_router };
