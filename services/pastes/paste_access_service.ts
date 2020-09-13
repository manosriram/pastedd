import { Request } from "express";
import { AuthService } from "../auth/";
import { TYPE_PASTE, UserPayload, Limits_FREE } from "../../types";
import { Paste } from "../../models/Paste";

declare global {
    namespace Express {
        interface Request {
            current_user_name?: string;
        }
    }
}

function create_auth_service() {
    const service = new AuthService();
    return service;
}

class PasteAccessService {
    async per_day_check(user: any) {
        const now = new Date().getTime();
        const renew = new Date(user.next_renew).getTime();
        console.log(user);

        // New day, reset variables and grant permission (return true).
        if (now - renew > 0) {
            const updated_renew = new Date(user.next_renew);
            updated_renew.setDate(new Date(updated_renew).getDate() + 1);
            user.next_renew = updated_renew.getTime();

            user.paste_count!.pd_public_pcount = 0;
            user.paste_count!.pd_private_pcount = 0;
            user.paste_count!.pd_unlisted_pcount = 0;

            await user.save();
            return true;
        } else {
            // Check for constraints.
            const {
                pd_public_pcount,
                pd_private_pcount,
                pd_unlisted_pcount
            } = user.paste_count;
            console.log("IN");
            if (
                pd_public_pcount + pd_unlisted_pcount + pd_private_pcount >=
                Limits_FREE.PER_DAY_LIMIT
            ) {
                return false;
            } else {
                return true;
            }
        }
    }

    async can_user_paste_free(user: any, paste_t: string) {
        switch (paste_t) {
            case TYPE_PASTE.PRIVATE:
                if (
                    user.paste_count!.private_pcount >=
                    Limits_FREE.PRIVATE_LIMIT
                )
                    return false;
                user.paste_count!.private_pcount += 1;
                user.paste_count!.pd_private_pcount += 1;
                break;
            case TYPE_PASTE.UNLISTED:
                if (
                    user.paste_count!.unlisted_pcount >=
                    Limits_FREE.UNLISTED_LIMIT
                )
                    return false;
                user.paste_count!.unlisted_pcount += 1;
                user.paste_count!.pd_unlisted_pcount += 1;
                break;
            default:
                user.paste_count!.public_pcount += 1;
                user.paste_count!.pd_public_pcount += 1;
                break;
        }
        await user.save();

        return true;
    }

    async can_paste(req: Request) {
        try {
            const auth_service = create_auth_service();
            const current_user = await auth_service.current_user(req);
            if (!current_user || current_user.is_banned) return false;
            else {
                req.current_user_name = current_user?.user_name;
                // If the per-day-paste limit is satisfied, check the user's free paste limitations.
                const pdc = await this.per_day_check(current_user!);
                if (pdc) {
                    return true;
                    // return this.can_user_paste_free(
                    // current_user,
                    // req.body.paste_type
                    // );
                } else return false;
            }
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    async can_edit(req: Request, paste_id: string) {
        const paste = await Paste.findOne({ paste_id });
        const auth_service = create_auth_service();
        const current_user = await auth_service.current_user(req);

        if (!current_user || current_user.is_banned)
            return { success: false, message: "Signin to edit your paste(s)" };
        if (!paste) return { success: false, message: "Paste not found" };

        if (paste.user === current_user.user_name) return { success: true };
        else
            return {
                success: false,
                message:
                    "This paste doesn't belong to your account. You can clone\
                    this paste and the edit."
            };
    }
}

export { PasteAccessService };
