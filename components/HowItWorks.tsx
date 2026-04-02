const steps = [
  { step: "1", title: "QR 또는 링크로 접속", desc: "객실 안내 QR로 랜딩 페이지에 들어옵니다." },
  { step: "2", title: "챗봇 시작", desc: "버튼 한 번으로 대화 화면으로 이동합니다." },
  { step: "3", title: "질문 입력", desc: "궁금한 점을 입력하면 실시간으로 안내합니다." },
];

export function HowItWorks() {
  return (
    <section className="border-y border-neutral-100 bg-primary-50/50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">이용 방법</h2>
        <p className="mt-3 text-neutral-700">세 단계면 충분합니다.</p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.step}
              className="rounded-[24px] border border-neutral-100 bg-neutral-0 p-6 shadow-soft"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                {s.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
