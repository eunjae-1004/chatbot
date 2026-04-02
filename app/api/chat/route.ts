import { NextRequest, NextResponse } from "next/server";

const DEFAULT_WEBHOOK =
  process.env.N8N_WEBHOOK_URL ?? "http://127.0.0.1:5678/webhook-test/ddo_chat";

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

  const url = DEFAULT_WEBHOOK;

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
    const message = e instanceof Error ? e.message : String(e);
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
