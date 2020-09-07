import express, { Request, Response, NextFunction } from "express";
const router: express.Router = express.Router();

// @ -> /u/signout
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session = null;
        return res
            .status(200)
            .json({ success: true, message: "Successfully Logged out" });
    } catch (err) {
        next(err);
    }
});

export { router as signout_router };
