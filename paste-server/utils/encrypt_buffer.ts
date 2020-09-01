import crypto from "crypto";

export function encrypt_buffer(buffer: string) {
    let encrypted_data: string;

    const cipher = crypto.createCipher("aes-256-cbc", "pass");
    encrypted_data = cipher.update(buffer, "utf8", "binary");
    encrypted_data += cipher.final("binary");
    return encrypted_data;
}
