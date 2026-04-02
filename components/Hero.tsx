import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="rounded-[32px] bg-primary-50 p-8 lg:p-14">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-medium text-primary-700">
            Hotel Guest Support
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 lg:text-5xl xl:text-6xl">
            숙박과 식사 문의,
            <br />
            기다리지 말고 바로 물어보세요
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-700">
            호텔 이용 중 궁금한 점을 빠르게 안내해 드리는 고객 지원 챗봇입니다.
            체크인·체크아웃, 조식, 룸서비스, 부대시설 이용 정보를 편하게 확인해
            보세요.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-[#222222] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              고객 지원 챗봇과 대화하기
            </Link>
            <a
              href="#faq"
              className="inline-flex items-center justify-center rounded-full border border-neutral-100 bg-white px-6 py-4 text-center text-base font-semibold text-neutral-900 shadow-soft transition-colors hover:bg-neutral-50"
            >
              자주 묻는 문의 보기
            </a>
          </div>
        </div>
        <div className="rounded-[28px] bg-white p-4 shadow-soft">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=960&q=80"
              alt="호텔 로비와 편안한 분위기"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
