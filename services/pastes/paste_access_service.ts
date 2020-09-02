import { Request } from "express";
import { AuthService } from "../auth";
import { TYPE_PASTE, UserPayload, Limits_FREE } from "../../types";

declare global {
    namespace Express {
        interface Request {
            current_user?: UserPayload;
        }
    }
}

function create_auth_service() {
    const service = new AuthService();
    return service;
}

class PasteAccessService {
    async can_user_paste_free(user: any, paste_t: string) {
        const { private_pcount, unlisted_pcount } = user.paste_count;

        if (
            private_pcount > Limits_FREE.PRIVATE_LIMIT ||
            unlisted_pcount > Limits_FREE.UNLISTED_LIMIT
        ) {
            return false;
        }
        switch (paste_t) {
            case TYPE_PASTE.PRIVATE:
                user.paste_count.private_pcount += 1;
                break;
            case TYPE_PASTE.UNLISTED:
                user.paste_count.unlisted_pcount += 1;
                break;
            default:
                user.paste_count.public_pcount += 1;
                break;
        }
        await user.save();
        return true;
    }

    async can_paste(req: Request) {
        const auth_service = create_auth_service();
        const current_user = await auth_service.current_user(req);
        return this.can_user_paste_free(current_user, req.body.paste_type);
    }
}

export { PasteAccessService };
