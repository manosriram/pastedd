import crypto from "crypto";

export function decrypt_buffer(buffer: Buffer) {
    let decoded: string;
    const decipher = crypto.createDecipher("aes-256-cbc", "pass");

    decoded = decipher.update(buffer.toString(), "binary", "utf8");
    decoded += decipher.final("utf8");
    return decoded;
}
