import { NextResponse } from "next/server";

// Типізація та допоміжні функції (припускаємо, що вони визначені вище або імпортовані)
type Payload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  package?: string;
  company?: string;
};

const required: (keyof Payload)[] = ["name", "email", "phone", "message"];

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Приклад функції відправки (має бути реалізована згідно з вашим API)
async function sendTelegram(text: string) {
  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error("Telegram notification failed");
  }

  return { skipped: false };
}

function notificationText(data: Payload) {
  return `Neue Anfrage:\n\nName: ${data.name}\nE-Mail: ${data.email}\nTelefon: ${data.phone}\nPaket: ${data.package || "Keines"}\n\nNachricht: ${data.message}`;
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Payload;

    for (const key of required) {
      if (!data[key] || String(data[key]).trim().length < 2) {
        return NextResponse.json(
          { error: `Invalid ${key}` },
          { status: 400 }
        );
      }
    }

    if (!validEmail(String(data.email))) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    await sendTelegram(notificationText(data));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send enquiry" },
      { status: 500 }
    );
  }
}