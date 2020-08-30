import mongoose from "mongoose";
const mseconds = 86400000;

interface PasteAttrs {
    paste_id: String;
    paste_name: String;
    paste_created_at: Date;
    paste_expiry_at: Date;
    paste_type: String;
    paste_content: String;
    paste_syntax: String;
    last_modified_at: Number;
}

interface PasteDoc extends mongoose.Document {
    paste_id: String;
    paste_name: String;
    paste_created_at: Date;
    paste_expiry_at: Date;
    paste_type: String;
    paste_content: String;
    paste_syntax: String;
    last_modified_at: Number;
}

interface PasteModel extends mongoose.Model<PasteDoc> {
    build(attr: PasteAttrs): PasteDoc;
}

const paste_schema = new mongoose.Schema(
    {
        // Todo: created_by -> User Model.
        paste_id: {
            type: String,
            required: true,
            immutable: true
        },
        paste_name: {
            type: String,
            default: "Untitled"
        },
        paste_created_at: {
            type: Number,
            default: new Date().getTime(),
            immutable: true
        },
        paste_expiry_at: {
            type: Number,
            required: false,
            default: new Date().getTime() + 30 * mseconds
        },
        last_modified_at: {
            type: Number,
            default: new Date().getTime(),
            immutable: false,
            required: false
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
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

paste_schema.statics.build = (attrs: PasteAttrs) => {
    return new Paste(attrs);
};

const Paste = mongoose.model<PasteDoc, PasteModel>("Paste", paste_schema);

export { Paste };
