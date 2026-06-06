"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "이름을 입력하세요."),
  email: z.string().email("유효한 이메일을 입력하세요."),
  phone: z
    .string()
    .min(9, "전화번호를 입력하세요.")
    .regex(/^[0-9\-]+$/, "숫자와 하이픈만 입력 가능합니다."),
});

export type FormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone", string>>;
};

export async function submitLead(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      message: "입력값을 확인해주세요.",
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
      },
    };
  }

  try {
    await db.insert(leads).values(parsed.data);
    return { success: true, message: "제출이 완료되었습니다. 빠르게 연락드리겠습니다!" };
  } catch (error) {
    console.error("[submitLead]", error);
    return { success: false, message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
}
