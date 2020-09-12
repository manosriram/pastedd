import { Paste } from "../../models/Paste";
import { nanoid } from "nanoid";
import { decrypt_buffer } from "../../utils/decrypt_buffer";

const has_expired = (exp: Date) => {
    return new Date().getTime() > new Date(exp).getTime();
};

class PasteService {
    // Creates a Paste.
    async create_paste(paste_options: any) {
        const now = new Date();
        now.setMilliseconds(
            now.getMilliseconds() + parseInt(paste_options.paste_expiry_at)
        );
        paste_options.paste_expiry_at = new Date(now);
        paste_options.paste_id = nanoid(5);
        paste_options.last_modified_at = paste_options.paste_created_at;

        const new_paste = Paste.build(paste_options);
        await new_paste.save();

        return new_paste.paste_id;
    }

    // Returns a Paste on id.
    async get_paste(paste_id: string) {
        const paste = await Paste.findOne({ paste_id });
        if (!paste) {
            return null;
        } else if (has_expired(paste.paste_expiry_at)) {
            await Paste.deleteOne({ paste_id });
        } else {
            return paste;
        }
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
        const pastes = await Paste.find({
            user: user_name,
            $or: [{ paste_expiry_at: { $gte: new Date() } }]
        }).sort({
            paste_created_at: -1
        });

        pastes.map(async (paste, paste_index) => {
            if (has_expired(paste.paste_expiry_at)) {
                // decrement type: paste-count
                await Paste.deleteOne({ paste_id: paste.paste_id });
            } else {
                paste.paste_content = decrypt_buffer(
                    Buffer.from(paste.paste_content, "utf8")
                );
            }
        });
        return pastes;
    }
}

export { PasteService };
