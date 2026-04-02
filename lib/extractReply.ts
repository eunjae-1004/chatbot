/**
 * n8n Webhook 응답 형식이 환경마다 달라서, 흔한 패턴만 추출합니다.
 */
export function extractReplyFromWebhookPayload(raw: unknown): string {
  if (raw == null) return "";
  if (typeof raw === "string") return raw.trim() || raw;

  if (Array.isArray(raw) && raw.length > 0) {
    const first = raw[0];
    if (first && typeof first === "object") {
      const row = first as Record<string, unknown>;
      const j = row.json;
      if (j && typeof j === "object") {
        const o = j as Record<string, unknown>;
        const nested = ["output", "reply", "message", "text", "answer"] as const;
        for (const k of nested) {
          const v = o[k];
          if (typeof v === "string" && v.trim()) return v;
        }
      }
    }
    return extractReplyFromWebhookPayload(raw[0]);
  }

  if (typeof raw === "object") {
    const o = raw as Record<string, unknown>;

    const direct = ["reply", "message", "text", "output", "answer", "response"] as const;
    for (const k of direct) {
      const v = o[k];
      if (typeof v === "string" && v.trim()) return v;
    }

    const data = o.data;
    if (typeof data === "string" && data.trim()) return data;
    if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      for (const k of direct) {
        const v = d[k];
        if (typeof v === "string" && v.trim()) return v;
      }
    }

    const body = o.body;
    if (typeof body === "string") return body;
    if (body && typeof body === "object") {
      const b = body as Record<string, unknown>;
      for (const k of direct) {
        const v = b[k];
        if (typeof v === "string" && v.trim()) return v;
      }
    }

    try {
      return JSON.stringify(raw, null, 2);
    } catch {
      return String(raw);
    }
  }

  return String(raw);
}
