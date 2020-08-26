import { Paste } from "../models/Paste";
import { nanoid } from "nanoid";

export default class PasteService {
    async create_paste(paste_options: any) {
        paste_options.paste_created_at = new Date();
        paste_options.paste_expiry_at = paste_options.paste_created_at; // To be revoked
        paste_options.paste_id = nanoid(8);

        const new_paste = Paste.build(paste_options); // Create new Paste
        await new_paste.save();
    }
}
