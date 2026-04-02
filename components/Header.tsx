import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-neutral-100 bg-neutral-0/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-neutral-900">
          Hotel Guest Support
        </Link>
        <nav className="flex items-center gap-4 text-sm text-neutral-700">
          <a href="#categories" className="hidden hover:text-neutral-900 sm:inline">
            안내
          </a>
          <a href="#faq" className="hidden hover:text-neutral-900 sm:inline">
            FAQ
          </a>
          <Link
            href="/chat"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#222222]"
          >
            챗봇 열기
          </Link>
        </nav>
      </div>
    </header>
  );
}
