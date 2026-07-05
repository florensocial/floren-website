type Payload = {
  package?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const required: (keyof Payload)[] = ["name", "email", "phone"];

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function notificationText(data: Payload) {
  return [
    "New Floren enquiry",
    data.package ? `Package: ${data.package}` : undefined,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.message ? `Message: ${data.message}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return { skipped: true };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) throw new Error("Telegram notification failed");

  return { skipped: false };
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Payload;

    for (const key of required) {
      if (!data[key] || String(data[key]).trim().length < 2) {
        return Response.json({ error: `Invalid ${key}` }, { status: 400 });
      }
    }

    if (!validEmail(String(data.email))) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    await sendTelegram(notificationText(data));

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unable to send enquiry" }, { status: 500 });
  }
}