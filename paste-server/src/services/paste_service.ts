import { Paste } from "../models/Paste";
import { nanoid } from "nanoid";

export default class PasteService {
    // Creates a Paste.
    async create_paste(paste_options: any) {
        paste_options.paste_created_at = new Date();
        paste_options.paste_expiry_at =
            new Date().getTime() + paste_options.paste_expiry_at * 86400000;
        paste_options.paste_id = nanoid(8);

        const new_paste = Paste.build(paste_options); // Create new Paste
        await new_paste.save();
    }

    // Returns a Paste on id.
    async get_paste(paste_id: string) {
       return await Paste.findOne({ paste_id: paste_id });
    }

    // Deletes a paste by id.
    async delete_paste(paste_id: string) {
        return await Paste.findOneAndDelete({ paste_id });
    }

    // Updates a paste by id.
    async update_paste(paste_id: string, options: any) {
        return await Paste.findOneAndUpdate({ paste_id }, { $set: options }, { new: true });
    }
}
