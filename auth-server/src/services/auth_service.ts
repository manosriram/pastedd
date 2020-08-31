import { User } from "../models/User";

export default class AuthService {
    async sign_up(options: any) {
        const new_user = User.build(options);
        await new_user.save();
        return new_user;
    }

    async sign_in(options: any) {}

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
}
