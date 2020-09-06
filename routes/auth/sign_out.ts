import express, { Request, Response, NextFunction } from "express";
const router: express.Router = express.Router();

router.all(
    "/signout",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.session = null;
            console.log(req.session);
            return res
                .status(200)
                .json({ success: true, message: "Successfully Logged out" });
        } catch (err) {
            next(err);
        }
    }
);

export { router as signout_router };
