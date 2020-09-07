import { Paste } from "../../models/Paste";
import { nanoid } from "nanoid";
import { decrypt_buffer } from "../../utils/decrypt_buffer";
const mseconds = 86400000;

class PasteService {
    // Creates a Paste.
    async create_paste(paste_options: any) {
        paste_options.paste_created_at = new Date().getTime();
        paste_options.paste_expiry_at =
            new Date().getTime() + paste_options.paste_expiry_at;
        paste_options.paste_id = nanoid(8);
        paste_options.last_modified_at = paste_options.paste_created_at;

        const new_paste = Paste.build(paste_options);
        await new_paste.save();

        return new_paste.paste_id;
    }

    // Returns a Paste on id.
    async get_paste(paste_id: string) {
        return await Paste.findOne({ paste_id });
    }

    // Deletes a paste by id.
    async delete_paste(paste_id: string) {
        return await Paste.findOneAndDelete({
            paste_id,
            useFindAndModify: true
        });
    }

    // Updates a paste by id.
    async update_paste(paste_id: string, options: any) {
        const paste = await Paste.findOneAndUpdate(
            { paste_id },
            { $set: options, last_modified_at: new Date().getTime() },
            { new: true, useFindAndModify: true }
        );

        return paste;
    }

    async get_user_paste(user_name: string) {
        const pastes = await Paste.find({ user: user_name });
        pastes.map((paste, paste_index) => {
            paste.paste_content = decrypt_buffer(
                Buffer.from(paste.paste_content, "utf8")
            );
        });
        return pastes;
    }
}

export { PasteService };
