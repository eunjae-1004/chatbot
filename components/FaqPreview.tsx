const faqs = [
  {
    q: "체크아웃 시간은 언제인가요?",
    a: "일반적으로 오전 11시입니다. 연장이 필요하시면 프런트 또는 챗봇으로 문의해 주세요.",
  },
  {
    q: "조식은 어디서 이용하나요?",
    a: "1층 레스토랑에서 이용 가능합니다. 운영 시간은 시즌에 따라 달라질 수 있어 챗봇으로 확인해 주세요.",
  },
  {
    q: "Wi-Fi는 어떻게 연결하나요?",
    a: "객실 안내 카드의 네트워크명과 비밀번호를 참고하시거나, 챗봇에 ‘Wi-Fi’라고 물어보세요.",
  },
];

export function FaqPreview() {
  return (
    <section id="faq" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">자주 묻는 문의</h2>
        <p className="mt-3 text-neutral-700">미리 확인해 보세요.</p>
        <ul className="mt-10 space-y-4">
          {faqs.map((item) => (
            <li
              key={item.q}
              className="rounded-[20px] border border-neutral-100 bg-neutral-0 px-5 py-4 shadow-soft"
            >
              <p className="font-semibold text-neutral-900">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
