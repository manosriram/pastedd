import { CronJob } from "cron";
import { Paste } from "../models/Paste";

async function delete_paste(paste_id: string) {
    await Paste.findOneAndDelete({ paste_id });
}

function check_expiry(paste: any) {
    const now = new Date().getTime();
    if (paste.paste_expiry_at <= now) {
        delete_paste(paste.paste_id);
    }
}

export async function guest_paste_exp() {
    try {
        const pastes = await Paste.find();

        const job = new CronJob("00 00 1 * *", () => {
            pastes.map((paste, paste_index) => {
                check_expiry(paste);
            });
        });
        job.start();
    } catch (err) {
        console.log(err);
    }
}
