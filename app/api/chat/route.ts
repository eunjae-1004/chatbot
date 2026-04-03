import { NextRequest, NextResponse } from "next/server";

const DEFAULT_WEBHOOK_FALLBACK =
  "http://127.0.0.1:5678/webhook-test/ddo_chat";

/** Node fetch 실패 시 cause(연결 거부·DNS·인증서 등)를 문자열로 합침 */
function formatFetchError(e: unknown): string {
  if (!(e instanceof Error)) return String(e);
  const parts: string[] = [e.message];
  const cause = (e as Error & { cause?: unknown }).cause;
  if (cause instanceof Error) {
    parts.push(cause.message);
  } else if (cause && typeof cause === "object" && cause !== null) {
    const c = cause as { code?: string; errno?: number; syscall?: string };
    if (c.code) parts.push(`code=${c.code}`);
    if (c.errno != null) parts.push(`errno=${c.errno}`);
    if (c.syscall) parts.push(`syscall=${c.syscall}`);
  }
  return parts.join(" | ");
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON 본문이 필요합니다." },
      { status: 400 }
    );
  }

  const url = process.env.N8N_WEBHOOK_URL ?? DEFAULT_WEBHOOK_FALLBACK;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await res.text();
    let parsed: unknown = text;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = text;
    }

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        data: parsed,
      },
      { status: res.ok ? 200 : 502 }
    );
  } catch (e) {
    console.error("[api/chat] n8n fetch failed", e);
    const message = formatFetchError(e);
    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint:
          "n8n이 실행 중인지, Webhook 경로가 맞는지 확인하세요. 환경변수 N8N_WEBHOOK_URL로 URL을 바꿀 수 있습니다.",
      },
      { status: 502 }
    );
  }
}
