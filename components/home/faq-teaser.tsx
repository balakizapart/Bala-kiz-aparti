import Link from "next/link";
import { Accordion, Container, Eyebrow, Reveal, Section, SplitText } from "@/components/ui/primitives";
import { localePath, type Locale } from "@/lib/i18n";

/* Ana sayfadaki kısa SSS. Tam liste /sss sayfasında. */
export const faqTeaser = {
  tr: [
    {
      q: "Giriş-çıkış saati var mı?",
      a: "Hayır, kapıda saat sınırı yok. Bina girişi ve her kat 7/24 güvenlik kamerasıyla izleniyor; en dış kapı yalnızca apartta kalan öğrencilere verilen sensörlü anahtarlıkla açılıyor.",
    },
    {
      q: "Odalar eşyalı mı?",
      a: "Evet. Odada yatak, çalışma masası, rahat bir çalışma sandalyesi, kitaplık ve gardırop var. Dairede ise beyaz eşyalarıyla mutfak, banyo, ortak alan ve çamaşır makinesi bulunuyor. Valizinizle gelmeniz yeterli.",
    },
    {
      q: "İnternet, su, elektrik ve doğalgaz ücrete dahil mi?",
      a: "Hepsi kirada. İnternet, su, elektrik ve doğalgaz için ayrıca fatura gelmez; ay sonunda sürpriz bir kalem çıkmaz.",
    },
    {
      q: "Sözleşme kaç aylık?",
      a: "Standart sözleşme 10 aylıktır (Eylül-Haziran). Yaz döneminde kalmak isteyenler için aylık seçenek de var.",
    },
    {
      q: "Misafir kabul edilebiliyor mu?",
      a: "Öğrencilerin girişinde, ailelerinin yerleşmeyi yapabilmesi için misafir kabul edilir.",
    },
  ],
  en: [
    {
      q: "Is there a curfew?",
      a: "No, there is no time limit at the door. The entrance and every floor are monitored by security cameras around the clock, and the outer door only opens with a sensor fob given to residents.",
    },
    {
      q: "Are the rooms furnished?",
      a: "Yes. Each room has a bed, a study desk, a comfortable study chair, a bookshelf and a wardrobe. The flat has a kitchen with white goods, a bathroom, a living area and a washing machine. Just bring your suitcase.",
    },
    {
      q: "Are internet, water, electricity and gas included?",
      a: "All of them are in the rent. There is no separate bill for internet, water, electricity or gas, and no surprise item at the end of the month.",
    },
    {
      q: "How long is the contract?",
      a: "The standard contract is ten months (September to June). A monthly option is available for those who want to stay over the summer.",
    },
    {
      q: "Are guests allowed?",
      a: "Guests are welcome at move-in, so that families can help their daughters settle in.",
    },
  ],
} as const;

const copy = {
  tr: { eyebrow: "Sık sorulanlar", title: "Merak edilenler.", all: "Tüm sorular" },
  en: { eyebrow: "FAQ", title: "The usual questions.", all: "All questions" },
} as const;

export function FaqTeaser({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section id="sss">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow index="07">{c.eyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={c.title}
              className="mt-6 font-display text-h1 font-bold text-balance"
            />
          </div>
          <Reveal delay={0.1}>
            <Link
              href={localePath(locale, "/sss")}
              className="link-underline text-sm font-semibold text-fuchsia"
            >
              {c.all} →
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <Accordion items={[...faqTeaser[locale]]} className="mt-12" />
        </Reveal>
      </Container>
    </Section>
  );
}
