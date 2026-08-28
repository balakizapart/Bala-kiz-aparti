import type { Metadata } from "next";
import { Container, Reveal, Section } from "@/components/ui/primitives";
import { PageHeader } from "@/components/pages/page-header";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/* ⚠️ Bu metin bir TASLAKTIR. Yayına almadan önce bir hukuk danışmanına
   gözden geçirtin. Sitede analitik/izleme aracı kurulursa metin
   güncellenmeli ve çerez rızası bandı eklenmelidir. */

const copy = {
  tr: {
    eyebrow: "KVKK",
    title: "Aydınlatma Metni",
    lead: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, sitemizi kullanırken verilerinizin nasıl işlendiğini açıklıyoruz.",
    updated: "Son güncelleme",
    sections: [
      {
        h: "Veri sorumlusu",
        p: [
          `${site.name}, Eskibağlar Mahallesi Akmescit Sokak No:4, 26170 Tepebaşı/${site.city}. İletişim: ${site.phoneDisplay} · ${site.email}`,
        ],
      },
      {
        h: "Bu sitede hangi veriler toplanıyor?",
        p: [
          "Bu web sitesi ziyaretçilerinden kişisel veri toplamaz. Site tamamen statik yayınlanır; üyelik, hesap ya da veritabanı kaydı yoktur.",
          "Sitede analitik, reklam ya da izleme çerezi kullanılmaz. Bu nedenle çerez rızası bandı da bulunmaz.",
          "Sitenin barındırıldığı sunucu, teknik zorunluluk gereği standart erişim kayıtları (IP adresi, tarayıcı bilgisi, istek zamanı) tutabilir. Bu kayıtlar güvenlik ve hata takibi dışında kullanılmaz.",
        ],
      },
      {
        h: "Ön kayıt formu",
        p: [
          "Ön kayıt formuna yazdığınız bilgiler bize doğrudan gönderilmez ve bir veritabanına kaydedilmez. Formu gönderdiğinizde, girdiğiniz bilgilerle hazırlanmış bir WhatsApp mesajı kendi cihazınızda açılır; mesajı okuma, değiştirme ve gönderme kararı tamamen sizindir.",
          "Mesajı gönderdiğinizde iletişim bilgileriniz WhatsApp üzerinden bize ulaşır. Bu noktadan sonra WhatsApp'ın kendi gizlilik politikası da geçerlidir.",
        ],
      },
      {
        h: "Bize ulaştığınızda işlenen veriler",
        p: [
          "Telefon, WhatsApp veya e-posta ile bize ulaştığınızda paylaştığınız ad, telefon numarası, e-posta adresi ve talebinizin içeriği; yalnızca talebinizi değerlendirmek, size dönüş yapmak ve uygun odayı ayırmak amacıyla işlenir.",
          "Bu veriler üçüncü kişilerle paylaşılmaz; yalnızca yasal bir yükümlülük doğması hâlinde yetkili kamu kurumlarına aktarılabilir.",
          "Talebiniz sonuçlandıktan sonra makul bir süre içinde silinir. Kiracı olmanız durumunda ise sözleşme ilişkisi ve yasal saklama süreleri geçerli olur.",
        ],
      },
      {
        h: "Haritalar",
        p: [
          "Konum sayfalarındaki harita Google Maps'ten yüklenir ve siz “Haritayı göster” düğmesine basmadan yüklenmez. Böylece izin vermediğiniz sürece Google'a hiçbir istek gitmez. Haritayı yüklediğinizde Google'ın kendi gizlilik politikası geçerli olur.",
        ],
      },
      {
        h: "Haklarınız",
        p: [
          "KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz.",
          `Taleplerinizi ${site.email} adresine ya da ${site.phoneDisplay} numarasına iletebilirsiniz. Başvurularınız en geç otuz gün içinde sonuçlandırılır.`,
        ],
      },
    ],
    draftNote:
      "Bu metin bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez.",
  },

  en: {
    eyebrow: "Privacy",
    title: "Privacy Notice",
    lead: "Under Turkish Personal Data Protection Law No. 6698, this page explains how your data is handled when you use our website.",
    updated: "Last updated",
    sections: [
      {
        h: "Data controller",
        p: [
          `${site.name}, Akmescit Sokak No:4, Eskibağlar, 26170 Tepebaşı/${site.city}, Türkiye. Contact: ${site.phoneDisplay} · ${site.email}`,
        ],
      },
      {
        h: "What this site collects",
        p: [
          "This website does not collect personal data from visitors. It is published as a fully static site: there are no accounts, no logins and no database.",
          "No analytics, advertising or tracking cookies are used, which is why there is no cookie consent banner.",
          "The hosting server may keep standard access logs (IP address, browser, request time) as a technical necessity. These are used only for security and error tracking.",
        ],
      },
      {
        h: "The booking form",
        p: [
          "What you type into the booking form is not sent to us directly and is not stored in any database. When you submit it, a WhatsApp message pre-filled with your details opens on your own device; reading, editing and sending it is entirely your decision.",
          "Once you send the message, your details reach us through WhatsApp, at which point WhatsApp's own privacy policy also applies.",
        ],
      },
      {
        h: "Data processed when you contact us",
        p: [
          "When you reach us by phone, WhatsApp or email, the name, phone number, email address and request you share are processed solely to evaluate your request, get back to you and hold a suitable room.",
          "This data is not shared with third parties; it may only be transferred to public authorities where a legal obligation arises.",
          "It is deleted within a reasonable period after your request is concluded. If you become a resident, the contractual relationship and statutory retention periods apply instead.",
        ],
      },
      {
        h: "Maps",
        p: [
          "The map on our location pages loads from Google Maps and is not loaded until you press “Show the map”. No request goes to Google until you allow it. Once loaded, Google's own privacy policy applies.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "Under Article 11 of the law you have the right to learn whether your personal data is processed, to request information about it, to have it corrected or deleted, and to object to its processing.",
          `You can send your requests to ${site.email} or call ${site.phoneDisplay}. Applications are concluded within thirty days at the latest.`,
        ],
      },
    ],
    draftNote: "This text is for information only and does not constitute legal advice.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  return pageMetadata({
    locale: l,
    path: "/kvkk",
    title: l === "tr" ? "KVKK Aydınlatma Metni" : "Privacy Notice",
    description:
      l === "tr"
        ? "Bala Kız Apartı KVKK aydınlatma metni: sitede hangi veriler işlenir, ön kayıt formu nasıl çalışır, haklarınız nelerdir."
        : "Privacy notice for Bala Girls' Residence: what data the site processes, how the booking form works and what your rights are.",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  const c = copy[l];

  return (
    <>
      <PageHeader index="01" eyebrow={c.eyebrow} title={c.title} lead={c.lead} gradientLastWords={1} />

      <Section className="pt-0">
        <Container size="narrow">
          <div className="space-y-12">
            {c.sections.map((s, i) => (
              <Reveal key={s.h} delay={i * 0.05}>
                <section>
                  <h2 className="font-display text-h3 font-bold">{s.h}</h2>
                  {s.p.map((p) => (
                    <p key={p} className="mt-4 text-pretty leading-relaxed text-ink-soft">
                      {p}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}

            <Reveal>
              <p className="rounded-(--radius-sm) border border-line bg-sand/70 p-5 text-sm text-ink-soft">
                {c.draftNote}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
