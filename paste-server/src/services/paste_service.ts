import { Paste } from "../models/Paste";
import { nanoid } from "nanoid";

export default class PasteService {
    async create_paste(paste_options: any) {
        paste_options.paste_created_at = new Date();
        paste_options.paste_expiry_at =
            new Date().getTime() + paste_options.paste_expiry_at * 86400000;
        paste_options.paste_id = nanoid(8);

        const new_paste = Paste.build(paste_options); // Create new Paste
        await new_paste.save();
    }
}
