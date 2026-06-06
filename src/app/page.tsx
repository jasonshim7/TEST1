import LeadForm from "./LeadForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">문의하기</h1>
        <p className="text-sm text-gray-500 mb-6">
          아래 정보를 입력하시면 빠르게 연락드리겠습니다.
        </p>
        <LeadForm />
      </div>
    </main>
  );
}
