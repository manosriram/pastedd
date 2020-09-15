import { Request, Response, NextFunction } from "express";
import { PasteService } from "../../services/pastes/";

async function can_view(req: Request, res: Response, next: NextFunction) {
    const { paste_id } = req.params;
    const paste = await new PasteService().can_view_paste(req, paste_id);
    if (!paste!.success) return next(new Error(paste!.message));
    else next();
}

export { can_view };
