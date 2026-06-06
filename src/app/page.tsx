export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">문의하기</h1>
        <p className="text-sm text-gray-500 mb-6">아래 정보를 입력하시면 빠르게 연락드리겠습니다.</p>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600" htmlFor="name">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="홍길동"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600" htmlFor="phone">
              전화번호
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="010-0000-0000"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 text-sm transition cursor-pointer"
          >
            제출하기
          </button>
        </form>
      </div>
    </main>
  );
}
