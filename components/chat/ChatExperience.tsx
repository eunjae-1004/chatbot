"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { extractReplyFromWebhookPayload } from "@/lib/extractReply";
import { getOrCreateUserId, resetUserId } from "@/lib/userId";

const STORAGE_KEY = "hotel_guest_chat_messages_v1";

const WELCOME =
  "안녕하세요. 호텔 이용 중 궁금한 점을 도와드릴게요.\n체크인·체크아웃, 조식, 룸서비스, 시설 이용 관련 문의를 남겨주세요.";

const QUICK_CHIPS = [
  "체크인 시간은 언제인가요?",
  "조식 운영 시간이 궁금해요",
  "체크아웃 연장이 가능한가요?",
  "주차 이용 방법 알려주세요",
];

type ChatMessage = {
  id: string;
  role: "user" | "bot" | "system";
  content: string;
  createdAt: string;
};

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function loadMessages(): ChatMessage[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed as ChatMessage[];
  } catch {
    return null;
  }
}

export function ChatExperience() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "bot",
      content: WELCOME,
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryText, setRetryText] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = loadMessages();
    if (saved && saved.length) setMessages(saved);
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, error]);

  const postToN8n = useCallback(async (messageText: string) => {
    const payload = {
      message: messageText,
      userid: getOrCreateUserId(),
      timestamp: new Date().toISOString(),
      type: "user_message",
    };

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = (await res.json()) as {
      ok?: boolean;
      data?: unknown;
      error?: string;
      hint?: string;
    };

    if (!res.ok) {
      const msg =
        typeof json.error === "string"
          ? json.error
          : "일시적으로 응답을 받지 못했어요. 다시 시도해주세요.";
      throw new Error(json.hint ? `${msg} (${json.hint})` : msg);
    }

    const reply = extractReplyFromWebhookPayload(json.data);
    return reply.trim()
      ? reply
      : "(응답이 비어 있습니다. n8n 워크플로 응답 형식을 확인해주세요.)";
  }, []);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;

    setError(null);
    setRetryText(null);

    const userMsg: ChatMessage = {
      id: newId(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await postToN8n(text);
      const botMsg: ChatMessage = {
        id: newId(),
        role: "bot",
        content: reply,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "메시지 전송에 실패했습니다. 다시 시도해주세요.";
      setError(msg);
      setRetryText(text);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const handleRetry = () => {
    if (!retryText) return;
    setError(null);
    const text = retryText;
    setRetryText(null);
    setLoading(true);
    void (async () => {
      try {
        const reply = await postToN8n(text);
        const botMsg: ChatMessage = {
          id: newId(),
          role: "bot",
          content: reply,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "메시지 전송에 실패했습니다. 다시 시도해주세요.";
        setError(msg);
        setRetryText(text);
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleNewChat = () => {
    resetUserId();
    setMessages([
      {
        id: "welcome",
        role: "bot",
        content: WELCOME,
        createdAt: new Date().toISOString(),
      },
    ]);
    setInput("");
    setError(null);
    setRetryText(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-100 bg-neutral-0/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm font-medium text-primary-700 hover:text-primary-500"
          >
            ← 랜딩으로
          </Link>
          <button
            type="button"
            onClick={handleNewChat}
            className="rounded-full border border-neutral-100 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-soft hover:bg-neutral-50"
          >
            새 대화
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:px-8">
        <aside className="hidden rounded-[28px] bg-primary-50 p-6 lg:block">
          <h1 className="text-2xl font-bold text-neutral-900">고객 지원 챗봇</h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            숙박, 식사, 시설 이용 관련 문의를 남겨주세요.
          </p>
          <p className="mt-4 text-xs text-neutral-700">
            메시지는 서버로 전달되며, 응답은 n8n Webhook 결과를 보여줍니다.
          </p>
        </aside>

        <main className="flex min-h-[calc(100vh-5rem)] flex-col rounded-[28px] border border-neutral-100 bg-neutral-0 shadow-soft">
          <div className="border-b border-neutral-100 px-4 py-3 lg:hidden">
            <h1 className="text-lg font-bold text-neutral-900">고객 지원 챗봇</h1>
            <p className="text-xs text-neutral-700">숙박·식사·시설 문의</p>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-neutral-100 px-3 py-3">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                disabled={loading}
                onClick={() => setInput(chip)}
                className="rounded-full bg-primary-100 px-3 py-1.5 text-left text-xs font-medium text-neutral-900 hover:bg-primary-200 disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          <div
            className="flex-1 space-y-4 overflow-y-auto p-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[75%] whitespace-pre-wrap rounded-[24px] bg-accent-butter px-5 py-4 text-sm text-neutral-900"
                      : "max-w-[75%] whitespace-pre-wrap rounded-[24px] bg-accent-mist px-5 py-4 text-sm text-neutral-900"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-[24px] bg-neutral-100 px-5 py-4 text-sm text-neutral-700">
                  답변을 불러오는 중이에요…
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-[20px] border border-red-200 bg-danger-soft px-4 py-3 text-sm text-neutral-900">
                <p className="font-medium">응답을 불러오지 못했어요</p>
                <p className="mt-1 text-neutral-700">{error}</p>
                {retryText && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={loading}
                    className="mt-3 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    다시 시도
                  </button>
                )}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-auto flex items-end gap-3 border-t border-neutral-100 bg-neutral-50 p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              문의 내용
            </label>
            <textarea
              id="chat-input"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder="예: 조식 이용 시간은 언제인가요?"
              disabled={loading}
              className="min-h-[52px] flex-1 resize-none rounded-[20px] border border-transparent bg-neutral-0 px-4 py-3 text-sm text-neutral-900 outline-none ring-1 ring-neutral-100 placeholder:text-neutral-700 focus:border-primary-500 focus:ring-primary-500 disabled:bg-neutral-100"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="메시지 전송"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-lg text-white transition-colors hover:bg-[#222222] disabled:bg-neutral-100 disabled:text-neutral-700"
            >
              →
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
