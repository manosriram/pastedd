import mongoose from "mongoose";

interface UserAttrs {
    user_name: string;
    password: string;
    email: string;
    created_at: number;
    is_banned: boolean;
    ip_address: string;
    user_tier: string;
    paste_count: object;
}

interface UserDoc extends mongoose.Document {
    user_name: string;
    password: string;
    email: string;
    created_at: number;
    is_banned: boolean;
    ip_address: string;
    user_tier: string;
    paste_count: object;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttrs): UserDoc;
}

const user_schema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        created_at: {
            type: Number,
            default: new Date().getTime(),
            immutable: true
        },
        is_banned: {
            type: Boolean,
            default: false
        },
        ip_address: [
            {
                type: String
            }
        ],
        tier: {
            type: String,
            enum: ["free", "pro"],
            default: "free"
        },
        paste_count: {
            public: {
                type: Number,
                default: 0
            },
            private: {
                type: Number,
                default: 0
            },
            unlisted: {
                type: Number,
                default: 0
            }
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

user_schema.pre("save", async function(done) {
    // Hash password using service here.
});

user_schema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", user_schema);

export { User };
