"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";


export async function postData(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("Unauthorized")
    }

    const message = formData.get("message") as string;

    const data = await prisma.GuestBookEntry.create({
        data: {
            userId: user.id,
            message: message,
        }
    });

    if (!data) {
        throw new Error("Failed to create guestbook entry");
    }

    revalidatePath("/guestbook");

    return data;
}