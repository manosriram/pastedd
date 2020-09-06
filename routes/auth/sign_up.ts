import express, { Request, Response, NextFunction } from "express";
import { signup_validator } from "../../middlewares/auth/";
import { AuthService } from "../../services/auth/";
const router: express.Router = express.Router();

router.post(
    "/signup",
    signup_validator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, user_name } = req.body;
            console.log(email, user_name, password);

            // Auth Service to handle DB Calls.
            const service = new AuthService();

            // Check for existing user.
            const existing_user_service = await service.existing_user(
                email,
                user_name
            );
            const existing_user = await existing_user_service;

            // If User already exists.
            if (existing_user === 1)
                return next(new Error("User with given email already exists"));
            else if (existing_user === 2)
                return next(
                    new Error("User with given username already exists")
                );

            // Creating a new user using AuthService()
            const user_options = {
                email,
                password,
                user_name
            };
            const signup_user_service = service.sign_up(user_options);
            const new_user = await signup_user_service;

            // Return the new_user (No Password, See User Model "toJSON")
            return res.status(201).json({
                user: new_user,
                success: true,
                message: "User Successfully signedup, login to continue."
            });
        } catch (err) {
            next(err);
        }
    }
);

export { router as signup_router };
