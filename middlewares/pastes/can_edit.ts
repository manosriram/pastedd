import { Request, Response, NextFunction } from "express";
import { PasteAccessService } from "../../services/pastes/";

async function can_edit(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.jwt) {
        throw new Error("Signin to edit your pastes");
    }

    // To add currentUser to req, we have to reach the base class of Request and add a property.
    const service = new PasteAccessService();
    const can_user_paste = await service.can_paste(req);

    if (can_user_paste) {
        next();
    } else return next(new Error("Access denied, exceeded paste quota"));
}

export { can_edit };
