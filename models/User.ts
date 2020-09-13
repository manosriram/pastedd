import mongoose from "mongoose";
import { PasswordService } from "../services/auth/";

interface UserAttrs {
    user_name: string;
    password: string;
    email: string;
    created_at: number;
    is_banned: boolean;
    ip_address: string;
    user_tier: string;
    paste_count: object;
    per_day_session: number;
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
    per_day_session: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttrs): UserDoc;
}

const now = new Date().getTime();
const tom = new Date(now).setDate(new Date(now).getDate() + 1);
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
            default: now,
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
            public_pcount: {
                type: Number,
                default: 0
            },
            private_pcount: {
                type: Number,
                default: 0
            },
            unlisted_pcount: {
                type: Number,
                default: 0
            },
            pd_public_pcount: {
                type: Number,
                default: 0
            },
            pd_private_pcount: {
                type: Number,
                default: 0
            },
            pd_unlisted_pcount: {
                type: Number,
                default: 0
            }
        },
        next_renew: {
            type: Number,
            default: tom
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                delete ret.ip_address;
            }
        }
    }
);

user_schema.pre("save", async function(done) {
    // Hash password using service here.
    if (this.isModified("password")) {
        const hashed_password = await PasswordService.toHash(
            this.get("password")
        );
        this.set("password", hashed_password);
    }
    done();
});

user_schema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", user_schema);

export { User };
