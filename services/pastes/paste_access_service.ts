import { Request } from "express";
import { AuthService } from "../auth/";
import { TYPE_PASTE, UserPayload, Limits_FREE } from "../../types";

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
        console.log(user);
        const now = new Date().getTime();
        if (user.per_day_session - now > 86400000) {
            const aa_date = new Date(user.per_day_session);
            aa_date.setDate(new Date().getDate());
            user.per_day_session = aa_date.getTime();

            user.paste_count!.pd_public_pcount = 0;
            user.paste_count!.pd_private_pcount = 0;
            user.paste_count!.pd_unlisted_pcount = 0;

            await user.save();
            return false;
        } else {
            const {
                pd_public_pcount,
                pd_private_pcount,
                pd_unlisted_pcount
            } = user.paste_count;
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
            if (!current_user || !current_user.is_banned) return false;
            else {
                req.current_user_name = current_user?.user_name;
                // If the per-day-paste limit is satisfied, check the user's free paste limitations.
                const pdc = await this.per_day_check(current_user!);
                if (pdc) {
                    return this.can_user_paste_free(
                        current_user,
                        req.body.paste_type
                    );
                } else return false;
            }
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

export { PasteAccessService };
