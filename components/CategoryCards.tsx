const categories = [
  {
    title: "숙박 안내",
    description:
      "체크인, 체크아웃, 연장 가능 여부, 객실 이용 관련 안내",
    bg: "bg-accent-sage",
  },
  {
    title: "식사 안내",
    description: "조식 운영 시간, 레스토랑 위치, 룸서비스 문의",
    bg: "bg-accent-butter",
  },
  {
    title: "부대시설 안내",
    description: "피트니스, 수영장, 주차, 라운지 등 이용 정보",
    bg: "bg-accent-peach",
  },
  {
    title: "이용 문의",
    description: "공용 서비스, 편의 요청, 자주 묻는 질문 응대",
    bg: "bg-accent-mist",
  },
];

export function CategoryCards() {
  return (
    <section id="categories" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
          무엇을 도와드릴까요?
        </h2>
        <p className="mt-3 max-w-2xl text-base text-neutral-700">
          숙박, 식사, 시설까지 카테고리별로 빠르게 안내합니다.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <article
              key={c.title}
              className={`rounded-[24px] p-6 shadow-soft transition-shadow hover:shadow-md ${c.bg}`}
            >
              <h3 className="text-lg font-semibold text-neutral-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                {c.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
