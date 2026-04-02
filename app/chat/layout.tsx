import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고객 지원 챗봇",
  description: "숙박·식사·시설 문의를 남겨주세요.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
