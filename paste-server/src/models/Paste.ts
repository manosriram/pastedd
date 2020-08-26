import mongoose from "mongoose";
import { nanoid } from "nanoid";

interface PasteAttrs {
    paste_name: String;
    paste_created_at: Date;
    paste_expiry_at: Date;
    paste_type: String;
    paste_content: String;
    paste_syntax: String;
}

interface PasteDoc extends mongoose.Document {
    paste_name: String;
    paste_created_at: Date;
    paste_expiry_at: Date;
    paste_type: String;
    paste_content: String;
    paste_syntax: String;
}

interface PasteModel extends mongoose.Model<PasteDoc> {
    build(attr: PasteAttrs): PasteDoc;
}

const paste_schema = new mongoose.Schema(
    {
        paste_name: {
            type: String,
            required: true
        },
        paste_created_at: {
            type: Date,
            default: Date.now
        },
        paste_expiry_at: {
            type: Date,
            required: true
        },
        paste_type: {
            type: String,
            enum: ["public", "unlisted", "private"],
            default: "public"
        },
        paste_content: {
            type: String,
            required: true
        },
        paste_syntax: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = nanoid(8);

                delete ret._id;
            }
        }
    }
);

paste_schema.statics.build = (attrs: PasteAttrs) => {
    return new Paste(attrs);
};

const Paste = mongoose.model<PasteDoc, PasteModel>("Paste", paste_schema);

export { Paste };
