"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type ActionState = {
  success: boolean;
  message: string;
};

const schema = z.object({
  name: z.string().min(1, "이름을 입력하세요."),
  email: z.string().email("유효한 이메일을 입력하세요."),
  phone: z
    .string()
    .min(9, "전화번호를 입력하세요.")
    .regex(/^[0-9\-]+$/, "숫자와 하이픈만 입력 가능합니다."),
});

export async function updateLead(id: number, formData: FormData): Promise<ActionState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  try {
    await db.update(leads).set(parsed.data).where(eq(leads.id, id));
    revalidatePath("/admin");
    return { success: true, message: "수정되었습니다." };
  } catch (error) {
    console.error("[updateLead]", error);
    return { success: false, message: "수정 중 오류가 발생했습니다." };
  }
}

export async function deleteLead(id: number): Promise<ActionState> {
  try {
    await db.delete(leads).where(eq(leads.id, id));
    revalidatePath("/admin");
    return { success: true, message: "삭제되었습니다." };
  } catch (error) {
    console.error("[deleteLead]", error);
    return { success: false, message: "삭제 중 오류가 발생했습니다." };
  }
}
