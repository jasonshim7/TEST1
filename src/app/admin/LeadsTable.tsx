"use client";

import { useState, useTransition } from "react";
import { updateLead, deleteLead } from "./actions";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 text-sm">
        수집된 리드가 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left w-12">ID</th>
            <th className="px-4 py-3 text-left">이름</th>
            <th className="px-4 py-3 text-left">이메일</th>
            <th className="px-4 py-3 text-left">전화번호</th>
            <th className="px-4 py-3 text-left">등록일</th>
            <th className="px-4 py-3 text-center w-32">액션</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    setError("");
    startTransition(async () => {
      const result = await updateLead(lead.id, formData);
      if (result.success) {
        setEditing(false);
      } else {
        setError(result.message);
      }
    });
  }

  function handleDelete() {
    if (!window.confirm(`"${lead.name}"을(를) 삭제하시겠습니까?`)) return;
    startTransition(async () => {
      await deleteLead(lead.id);
    });
  }

  if (editing) {
    return (
      <tr className="bg-blue-50">
        <td className="px-4 py-2 text-gray-400">{lead.id}</td>
        <td className="px-4 py-2" colSpan={3}>
          <form id={`form-${lead.id}`} action={handleUpdate} className="flex gap-2 items-start">
            <div className="flex flex-col gap-1 flex-1">
              <input
                name="name"
                defaultValue={lead.name}
                placeholder="이름"
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <input
                name="email"
                defaultValue={lead.email}
                placeholder="이메일"
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <input
                name="phone"
                defaultValue={lead.phone}
                placeholder="전화번호"
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500 w-full"
              />
            </div>
            {error && (
              <p className="text-xs text-red-500 mt-1 col-span-3">{error}</p>
            )}
          </form>
        </td>
        <td className="px-4 py-2 text-gray-400 text-xs">
          {formatDate(lead.createdAt)}
        </td>
        <td className="px-4 py-2">
          <div className="flex gap-2 justify-center">
            <button
              type="submit"
              form={`form-${lead.id}`}
              disabled={isPending}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg text-xs font-semibold transition"
            >
              {isPending ? "저장 중..." : "저장"}
            </button>
            <button
              onClick={() => { setEditing(false); setError(""); }}
              disabled={isPending}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-semibold transition"
            >
              취소
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 text-gray-400">{lead.id}</td>
      <td className="px-4 py-3 font-medium text-gray-800">{lead.name}</td>
      <td className="px-4 py-3 text-gray-600">{lead.email}</td>
      <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
      <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(lead.createdAt)}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setEditing(true)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition disabled:opacity-50"
          >
            {isPending ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </td>
    </tr>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
