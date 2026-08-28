import type { Metadata } from "next";
import { Photo } from "@/components/ui/photo";
import {
  Container,
  Eyebrow,
  Parallax,
  Reveal,
  Section,
  SplitText,
} from "@/components/ui/primitives";
import { CtaBlock } from "@/components/pages/cta-block";
import { PageHeader } from "@/components/pages/page-header";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Hakkımızda",
    title: "İki bina, bir sokak arası, tek bir anlayış.",
    lead: "Bala Kız Apartı, Eskişehir Tepebaşı'nda yalnızca kız öğrencilere hizmet veren bir öğrenci apartıdır. Espark'ın karşısında, Eskibağlar Mahallesi'nde yan yana iki binadan oluşur.",
    meta: ["Yalnızca kız öğrenciler", "2 bina", "Tepebaşı, Eskişehir"],

    storyEyebrow: "Yaklaşımımız",
    storyTitle: "Şehrin en merkezinde, ferah bir ev.",
    story: [
      "Öğrenci evi aramanın en zor tarafı, uzaktan karar vermek zorunda kalmaktır. Fotoğraflar güzel görünür, adres yakın yazar, sonra taşınınca her şey başka çıkar. Biz bunun tersini yapmaya çalışıyoruz: ne varsa yazıyoruz, olmayan bir şeyi de var göstermiyoruz.",
      "Odalar tek ve iki kişilik. Her daire kendi içinde bir ev: mutfak, banyo, ortak alan ve çamaşır makinesi dairenin içinde. Ortak bir çamaşırhane ya da etüt salonu yok; çünkü ihtiyacın olan her şey zaten dairende.",
      "Konum tesadüf değil. Espark tam karşımızda, tramvay bir dakika. Anadolu Üniversitesi'ne yürüyerek beş dakikada varılıyor; Osmangazi'ye tramvayla on iki. Şehrin merkezinde olmak, akşam eve dönerken sokakların boş olmaması demek.",
    ],

    safetyEyebrow: "Güvenlik",
    safetyTitle: "Kim girdi, kim çıktı, belli.",
    safety: [
      {
        t: "Sensörlü anahtarlık",
        d: "Binanın en dış kapısı yalnızca apartta kalan öğrencilere verilen sensörlü anahtarlıkla açılır. Dışarıdan biri kendi başına içeri giremez.",
      },
      {
        t: "7/24 kamera",
        d: "Girişte ve her katta güvenlik kamerası var; kayıt kesintisiz alınır.",
      },
      {
        t: "Gündüz görevlisi",
        d: "Sabahtan akşam 18.00'e kadar görevlimiz binada. Bir aksilik olduğunda muhatap belli.",
      },
      {
        t: "Kapıda saat sınırı yok",
        d: "Giriş-çıkış saati uygulamıyoruz. Kimsenin kapıda kalmasını istemiyoruz; güvenliği saatle değil, kamerayla ve anahtarlıkla sağlıyoruz.",
      },
    ],

    rulesEyebrow: "Kurallar",
    rulesTitle: "Az sayıda, ama net.",
    rulesLead:
      "Kural listesi uzun olsun diye uzatılmaz. Bizde sadece herkesin huzuru için gerekli olanlar var.",
    rules: [
      "Odalar öğrencinin kendisinindir; haber verilmeden kapısı açılmaz.",
      "Ortak alanlar herkesin: kullandıktan sonra toparlamak yeterli.",
      "Sınav dönemlerinde gürültüye ekstra dikkat edilir.",
      "Misafir, öğrencilerin girişinde ailelerinin yerleşmeyi yapabilmesi için kabul edilir.",
      "Bir sorun olduğunda önce konuşulur; ceza kesmek gibi bir alışkanlığımız yok.",
    ],

    photos: ["Bala 1 girişi, Akmescit Sokak", "Bala 2 girişi, Aşçı Sokak"],
    breadcrumbHome: "Ana sayfa",
  },
  en: {
    eyebrow: "About",
    title: "Two buildings, one street apart, one way of doing things.",
    lead: "Bala Kız Apartı is a student residence for female students in Tepebaşı, Eskişehir. It is made up of two neighbouring buildings in Eskibağlar, right across from Espark.",
    meta: ["Female students only", "2 buildings", "Tepebaşı, Eskişehir"],

    storyEyebrow: "Our approach",
    storyTitle: "A bright home in the heart of the city.",
    story: [
      "The hardest part of finding student accommodation is having to decide from a distance. Photos look good, the address sounds close, and then you move in and everything is different. We try to do the opposite: we write down what is here, and we do not pretend to have what we don't.",
      "Rooms are single or twin. Every flat is a home in itself: kitchen, bathroom, living area and washing machine inside. There is no shared laundry room or study hall, because everything you need is already in your own flat.",
      "The location is no accident. Espark is right across the street and the tram is one minute away. Anadolu University is a five-minute walk; Osmangazi is twelve minutes by tram. Being central means the streets are never empty on your way home in the evening.",
    ],

    safetyEyebrow: "Safety",
    safetyTitle: "Who comes in and who goes out is known.",
    safety: [
      {
        t: "Sensor key fob",
        d: "The outer door opens only with a sensor fob given to residents. Nobody from outside can let themselves in.",
      },
      {
        t: "24/7 cameras",
        d: "Security cameras at the entrance and on every floor, recording without interruption.",
      },
      {
        t: "Daytime staff",
        d: "Our member of staff is in the building from morning until 6 pm, so there is always someone to turn to.",
      },
      {
        t: "No curfew",
        d: "We do not impose entry hours. Nobody should be locked out; safety comes from cameras and key fobs, not from a clock.",
      },
    ],

    rulesEyebrow: "House rules",
    rulesTitle: "Few, but clear.",
    rulesLead:
      "We do not pad the list to make it look thorough. These are the only rules everyone's peace of mind actually needs.",
    rules: [
      "A room belongs to the student living in it; nobody opens her door without telling her first.",
      "Shared spaces belong to everyone; tidying up after yourself is enough.",
      "Extra care about noise during exam periods.",
      "Guests are welcome at move-in, so families can help their daughters settle in.",
      "When something goes wrong we talk about it first; handing out penalties is not our habit.",
    ],

    photos: ["Bala 1 entrance, Akmescit Street", "Bala 2 entrance, Aşçı Street"],
    breadcrumbHome: "Home",
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
    path: "/hakkimizda",
    title:
      l === "tr"
        ? "Hakkımızda | Eskişehir Kız Öğrenci Apartı"
        : "About Us | Girls' Student Residence in Eskişehir",
    description:
      l === "tr"
        ? "Bala Kız Apartı: Eskişehir Tepebaşı'nda yalnızca kız öğrencilere hizmet veren iki binalı öğrenci apartı. Sensörlü anahtarlık, 7/24 kamera güvenliği, gündüz görevlisi ve net kurallar."
        : "Bala Girls' Residence: a two-building student residence for female students in Tepebaşı, Eskişehir. Sensor key fobs, 24/7 camera security, daytime staff and clear house rules.",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  const c = copy[l];
  const base = l === "tr" ? "" : "/en";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.breadcrumbHome, url: base || "/" },
          { name: c.eyebrow, url: `${base}/hakkimizda` },
        ])}
      />

      <PageHeader index="01" eyebrow={c.eyebrow} title={c.title} lead={c.lead} meta={[...c.meta]} />

      {/* ---- Yaklaşım + fotoğraflar ---- */}
      <Section className="pt-0">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow index="02">{c.storyEyebrow}</Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text={c.storyTitle}
                gradientLastWords={2}
                className="mt-6 font-display text-h2 font-bold text-balance"
              />
              <Reveal delay={0.1}>
                {c.story.map((p) => (
                  <p key={p} className="mt-5 max-w-prose text-pretty text-ink-soft">
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>

            {/* İki bina girişi yan yana. Fotoğraflar kendi oranında basılır. */}
            <div className="lg:col-span-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Parallax amount={22}>
                  <Photo
                    src="/images/bina-1-giris.jpg"
                    alt={`${c.photos[0]}, ${site.name}`}
                    caption={c.photos[0]}
                    tone={0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 24vw"
                  />
                </Parallax>
                <Parallax amount={-22}>
                  <Photo
                    src="/images/bina-2-giris.jpg"
                    alt={`${c.photos[1]}, ${site.name}`}
                    caption={c.photos[1]}
                    tone={1}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 24vw"
                  />
                </Parallax>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Güvenlik ---- */}
      <Section className="bg-ink text-white">
        <Container size="wide">
          <Reveal>
            <Eyebrow index="03" className="text-white/50">
              {c.safetyEyebrow}
            </Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text={c.safetyTitle}
            className="mt-6 max-w-3xl font-display text-h1 font-bold text-balance"
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-(--radius-md) bg-white/10 sm:grid-cols-2">
            {c.safety.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.07}>
                <div className="h-full bg-ink p-7 transition-colors duration-700 ease-(--ease-out-expo) hover:bg-white/[0.04]">
                  <span aria-hidden className="eyebrow grad-text font-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-h3 font-bold text-white">{s.t}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-white/65">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- Kurallar ---- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="04">{c.rulesEyebrow}</Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text={c.rulesTitle}
                gradientLastWords={1}
                className="mt-6 font-display text-h1 font-bold text-balance"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-prose text-pretty text-ink-soft">{c.rulesLead}</p>
              </Reveal>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {c.rules.map((r, i) => (
                <Reveal as="li" key={r} delay={i * 0.06}>
                  <div className="flex items-baseline gap-4 border-b border-line py-5">
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full grad text-[0.7rem] font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    <span className="text-pretty text-ink-soft">{r}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBlock locale={l} />
    </>
  );
}
