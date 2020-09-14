import { Paste } from "../../models/Paste";
import { nanoid } from "nanoid";
import { current_user, encrypt_buffer, decrypt_buffer } from "../../utils/";
import axios from "axios";
import { Request } from "express";

const has_expired = (exp: Date) => {
    return new Date().getTime() > new Date(exp).getTime();
};

interface current_user {
    email: string;
    user_name: string;
    iat: Date;
}

class PasteService {
    // Creates a Paste.
    async create_paste(paste_options: any) {
        let now = new Date().getTime();
        now += parseInt(paste_options.paste_expiry_at);

        paste_options.expiry_option = paste_options.paste_expiry_at;
        paste_options.paste_expiry_at = new Date(now);
        paste_options.paste_id = nanoid(5);
        paste_options.last_modified_at = paste_options.paste_created_at;

        const new_paste = Paste.build(paste_options);
        await new_paste.save();

        return new_paste.paste_id;
    }

    async can_view_paste(req: Request, paste_id: string) {
        const paste = await Paste.findOne({ paste_id });
        if (!paste) return { success: false, message: "Paste not found." };

        switch (paste?.paste_type) {
            case "public":
                if (has_expired(paste.paste_expiry_at)) {
                    Paste.deleteOne({ paste_id });
                    return {
                        success: false,
                        message: "Paste has expired or deleted by user."
                    };
                } else return { success: true, paste };
            case "unlisted":
                if (has_expired(paste.paste_expiry_at)) {
                    Paste.deleteOne({ paste_id });
                    return {
                        success: false,
                        message: "Paste has expired or deleted by user."
                    };
                } else return { success: true, paste };
            case "private":
                if (has_expired(paste.paste_expiry_at)) {
                    Paste.deleteOne({ paste_id });
                    return {
                        success: false,
                        message: "Paste has expired or deleted by user."
                    };
                } else {
                    const user = (await current_user(req)) as current_user;
                    if (!user) {
                        return {
                            success: false,
                            message: "Private paste is not opened to public."
                        };
                    }

                    const { user_name } = user;
                    if (paste.user === user_name) {
                        return { success: true, paste };
                    } else
                        return {
                            success: false,
                            message: "Private paste is not opened to public."
                        };
                }
        }
    }

    // Returns a Paste on id.
    async get_paste(paste_id: string) {
        const paste = await Paste.findOne({ paste_id });
        return paste;
    }

    // Deletes a paste by id.
    async delete_paste(paste_id: string) {
        return await Paste.findOneAndDelete({
            paste_id: paste_id
        });
    }

    // Updates a paste by id.
    async update_paste(paste_id: string, options: any) {
        options.paste_content = encrypt_buffer(options.paste_content);
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
