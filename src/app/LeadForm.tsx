"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, type FormState } from "./actions";

const initialState: FormState = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg py-3 text-sm transition cursor-pointer disabled:cursor-not-allowed"
    >
      {pending ? "제출 중..." : "제출하기"}
    </button>
  );
}

export default function LeadForm() {
  const [state, action] = useActionState(submitLead, initialState);

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="text-5xl">✅</div>
        <p className="text-lg font-bold text-gray-800">제출 완료!</p>
        <p className="text-sm text-gray-500">{state.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          다시 제출하기
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {state.message && !state.success && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {state.message}
        </p>
      )}

      <Field
        id="name"
        label="이름"
        type="text"
        placeholder="홍길동"
        error={state.errors?.name}
      />
      <Field
        id="email"
        label="이메일"
        type="email"
        placeholder="example@email.com"
        error={state.errors?.email}
      />
      <Field
        id="phone"
        label="전화번호"
        type="tel"
        placeholder="010-0000-0000"
        error={state.errors?.phone}
      />

      <SubmitButton />
    </form>
  );
}

function Field({
  id,
  label,
  type,
  placeholder,
  error,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={`border rounded-lg px-4 py-2.5 text-sm outline-none transition ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
