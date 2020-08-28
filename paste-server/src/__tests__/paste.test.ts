import { app } from "../server";
import request from "supertest";

describe("create a new paste", () => {
    it("should return a new paste object", async () => {
        let new_paste = await request(app)
            .post("/p/create_paste")
            .send({
                paste_type: "public",
                paste_name: "first paste",
                paste_expiry_at: 7,
                paste_content: "updated content!!",
                paste_syntax: "text"
            });
        expect(new_paste.body.success).toBe(true);
    });
});
