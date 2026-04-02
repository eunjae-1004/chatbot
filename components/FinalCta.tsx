import Link from "next/link";

export function FinalCta() {
  return (
    <section className="pb-16 pt-4 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="rounded-[32px] bg-primary-100 px-8 py-12 text-center md:px-14 md:py-16">
          <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            지금 바로 물어보세요
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-700">
            기다림 없이 숙박·식사·시설 문의를 처리해 드립니다.
          </p>
          <Link
            href="/chat"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#222222] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            고객 지원 챗봇과 대화하기
          </Link>
        </div>
      </div>
    </section>
  );
}
