import { Request } from "express";
import { User } from "../../models/User";
import { PasswordService } from "../../services/auth/";
import jwt from "jsonwebtoken";

class AuthService {
    async sign_up(options: any) {
        const new_user = User.build(options);
        await new_user.save();
        return new_user;
    }

    async sign_in(username: string, password: string, req: Request) {
        if (req.session?.jwt)
            return { success: false, message: "User already logged-in" };
        const user = await User.findOne({ username });
        if (!user) return { success: false };

        const password_match = PasswordService.compare(user.password, password);
        if (!password_match)
            return { message: "Incorrect Password", success: false };
        else {
            const payload = {
                user_name: user.user_name
            };
            const user_token = jwt.sign(payload, process.env.JWT_KEY!);
            req.session = {
                jwt: user_token
            };
            req.session.save();
            return { success: true, message: "User logged-in successfully" };
        }
    }

    async existing_user(email: string, user_name: string) {
        return new Promise((resolve, reject) => {
            User.find({ $or: [{ email }, { user_name }] }, (err, user) => {
                if (err) reject(err);
                if (user.length) {
                    if (user[0].email === email) resolve(1);
                    else resolve(2);
                } else {
                    resolve(0);
                }
            });
        });
    }

    async get_user(user_name: string) {
        return await User.findOne({ user_name });
    }

    async current_user(req: Request) {
        if (!req.session?.jwt) return null;

        const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
        return payload;
    }
}

export { AuthService };
