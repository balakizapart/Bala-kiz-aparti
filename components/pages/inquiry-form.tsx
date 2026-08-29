"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button, Reveal } from "@/components/ui/primitives";
import { roomTypes } from "@/lib/rooms";
import { site, waLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/* ============================================================
   ÖN KAYIT FORMU

   Form doldurulduğunda kayıt bir veritabanına gitmez; girilen
   bilgilerle hazırlanmış bir WhatsApp mesajı açılır. Böylece
   talep doğrudan işletmenin telefonuna düşer; arada kaybolacak
   bir kutu, kontrol edilmesi gereken bir panel olmaz.

   Doğrulama tarayıcıda yapılır; mesaj kullanıcının kendi
   WhatsApp'ından gönderildiği için sunucuya hiçbir veri gitmez.
   ============================================================ */

const copy = {
  tr: {
    name: "Ad Soyad",
    phone: "Telefonun",
    university: "Üniversite / Bölüm",
    roomType: "İlgilendiğin oda",
    moveIn: "Ne zaman taşınmak istiyorsun?",
    message: "Eklemek istediğin bir şey",
    optional: "isteğe bağlı",
    choose: "Henüz karar vermedim",
    submit: "WhatsApp'tan gönder",
    phoneHint: "Sana bu numaradan dönüş yapalım diye.",
    messageHint: "Aklına takılan bir soru, özel bir durum, ne varsa yaz.",
    note: "Gönder'e bastığında bilgilerin hazır yazılmış bir WhatsApp mesajı açılır. Mesajı okuyup istersen değiştirebilir, sonra gönderebilirsin.",
    errors: {
      name: "Adını ve soyadını yazar mısın?",
      phone: "Telefonu başındaki 0 ile yaz; örnek: 0541 386 26 00.",
    },
    prefer: "Yazmak yerine konuşmayı tercih edersen:",
    call: "Telefonla ara",
    waDirect: "Doğrudan WhatsApp",
    // Mesaj şablonu
    mHead: "Merhaba, Bala Kız Apartı için ön kayıt yaptırmak istiyorum.",
    mName: "Ad Soyad",
    mPhone: "Telefon",
    mUni: "Üniversite / Bölüm",
    mRoom: "İlgilendiğim oda",
    mMoveIn: "Taşınmak istediğim tarih",
    mNote: "Not",
  },
  en: {
    name: "Full name",
    phone: "Your phone",
    university: "University / Department",
    roomType: "Room you're interested in",
    moveIn: "When would you like to move in?",
    message: "Anything you'd like to add",
    optional: "optional",
    choose: "I haven't decided yet",
    submit: "Send via WhatsApp",
    phoneHint: "So we can get back to you on this number.",
    messageHint: "A question, a special situation, write whatever you like.",
    note: "When you press send, a WhatsApp message is opened with your details already written. You can read it, change it if you like, and then send it.",
    errors: {
      name: "Could you write your full name?",
      phone: "Please write a valid phone number.",
    },
    prefer: "If you would rather talk than type:",
    call: "Call us",
    waDirect: "WhatsApp directly",
    mHead: "Hello, I would like to book a room at Bala Kız Apartı.",
    mName: "Full name",
    mPhone: "Phone",
    mUni: "University / Department",
    mRoom: "Room of interest",
    mMoveIn: "Preferred move-in date",
    mNote: "Note",
  },
} as const;

const inputCls =
  "w-full rounded-(--radius-sm) border border-line bg-paper px-4 py-3 text-ink " +
  "placeholder:text-muted transition-[border-color,box-shadow] duration-300 ease-(--ease-out-expo) " +
  "hover:border-ink-soft focus:border-pine focus:shadow-(--shadow-soft) aria-[invalid=true]:border-gold-deep";

function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="eyebrow text-ink-soft">
          {label}
        </label>
        {required && (
          <span className="text-gold" aria-hidden>
            *
          </span>
        )}
      </div>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-gold-deep">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-ink-soft/80">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function InquiryForm({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    const name = get("full_name");
    const phone = get("phone");
    const next: { name?: string; phone?: string } = {};

    if (name.length < 3) next.name = c.errors.name;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) next.phone = c.errors.phone;

    setErrors(next);
    if (Object.keys(next).length > 0) {
      // İlk hatalı alana odaklan, klavye kullanıcısı kaybolmasın.
      const first = next.name ? "full_name" : "phone";
      document.getElementById(first)?.focus();
      return;
    }

    const lines = [
      c.mHead,
      "",
      `${c.mName}: ${name}`,
      `${c.mPhone}: ${phone}`,
    ];
    const uni = get("university");
    const room = get("room_type");
    const moveIn = get("move_in_date");
    const note = get("message");
    if (uni) lines.push(`${c.mUni}: ${uni}`);
    if (room) lines.push(`${c.mRoom}: ${room}`);
    if (moveIn) lines.push(`${c.mMoveIn}: ${moveIn}`);
    if (note) lines.push("", `${c.mNote}: ${note}`);

    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="full_name" label={c.name} error={errors.name} required>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "full_name-error" : undefined}
            className={inputCls}
          />
        </Field>

        <Field id="phone" label={c.phone} hint={c.phoneHint} error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="0541 386 26 00"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            className={inputCls}
          />
        </Field>

        <Field id="university" label={`${c.university} (${c.optional})`}>
          <input id="university" name="university" type="text" className={inputCls} />
        </Field>

        <Field id="room_type" label={`${c.roomType} (${c.optional})`}>
          <select id="room_type" name="room_type" defaultValue="" className={inputCls}>
            <option value="">{c.choose}</option>
            {roomTypes.map((r) => (
              <option key={r.slug} value={r.name[locale]}>
                {r.name[locale]}
              </option>
            ))}
          </select>
        </Field>

        <Field id="move_in_date" label={`${c.moveIn} (${c.optional})`}>
          <input id="move_in_date" name="move_in_date" type="date" className={inputCls} />
        </Field>
      </div>

      <Field id="message" label={`${c.message} (${c.optional})`} hint={c.messageHint}>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-describedby="message-hint"
          className={`${inputCls} resize-y`}
        />
      </Field>

      <Reveal>
        <p className="rounded-(--radius-sm) border border-line bg-sand/70 p-5 text-sm text-pretty text-ink-soft">
          {c.note}
        </p>
      </Reveal>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="whatsapp" size="lg">
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 12.13c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
          </svg>
          {c.submit}
        </Button>
      </div>

      <div className="border-t border-line pt-7">
        <p className="text-sm text-ink-soft">{c.prefer}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href={`tel:${site.phone}`} variant="outline" size="sm">
            {c.call} · {site.phoneDisplay}
          </Button>
          <Button href={waLink(c.mHead)} variant="ghost" size="sm">
            {c.waDirect}
          </Button>
        </div>
      </div>
    </form>
  );
}
