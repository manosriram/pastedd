import bcrypt from "bcryptjs";

class PasswordService {
    // Returns a hash, given plain string.
    static async toHash(password: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        return hash;
    }

    // Compares stores and supplied password to check if they're same.
    static async compare(storedPassword: string, suppliedPassword: string) {
        return bcrypt.compareSync(suppliedPassword, storedPassword);
    }
}

export { PasswordService };
