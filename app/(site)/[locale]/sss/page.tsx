import type { Metadata } from "next";
import { Accordion, Container, Eyebrow, Reveal, Section, SplitText } from "@/components/ui/primitives";
import { CtaBlock } from "@/components/pages/cta-block";
import { PageHeader } from "@/components/pages/page-header";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

type Group = { title: string; items: Array<{ q: string; a: string }> };

const groups: Record<Locale, Group[]> = {
  tr: [
    {
      title: "Odalar ve daire",
      items: [
        {
          q: "Odalar eşyalı mı?",
          a: "Evet, tamamen eşyalı. Odada yatak, çalışma masası, rahat bir çalışma sandalyesi, kitaplık ve gardırop var. Dairede ise beyaz eşyalarıyla mutfak, banyo, ortak alan ve çamaşır makinesi bulunuyor. Valizinle gelmen yeterli.",
        },
        {
          q: "Tek kişilik ve iki kişilik oda arasındaki fark ne?",
          a: "Tek kişilik odada tüm alan senin. Bir dairede iki tane tek kişilik oda bulunur ve daireyi iki kişi paylaşırsınız. İki kişilik odada ise iki yatak ve her eşyadan iki tane vardır: iki masa, iki sandalye, iki kitaplık, iki gardırop. Daire kurulumu ikisinde de aynıdır.",
        },
        {
          q: "Ortak çamaşırhane var mı?",
          a: "Ortak çamaşırhane yok, ihtiyaç da olmuyor: çamaşır makinesi her dairenin içinde. Kimseyle sıraya girmiyorsun, çamaşırını istediğin saatte yıkıyorsun.",
        },
        {
          q: "Ortak ders çalışma salonu var mı?",
          a: "Ayrı bir etüt salonu yok. Her odada kendi çalışma masan, sandalyen ve kitaplığın olduğu için ders çalışmak üzere başka bir yere gitmen gerekmiyor.",
        },
        {
          q: "Mutfak ve banyo kaç kişiyle paylaşılıyor?",
          a: "Daire bazında paylaşılıyor. Tek kişilik odalarda daireyi iki kişi kullanır; iki kişilik odada da aynı daire düzeni geçerlidir. Kat boyunca ortak, kalabalık bir banyo ya da mutfak yok.",
        },
      ],
    },
    {
      title: "Güvenlik ve giriş",
      items: [
        {
          q: "Giriş-çıkış saati var mı?",
          a: "Hayır, kapıda saat sınırı uygulamıyoruz. Bina girişi ve her kat 7/24 güvenlik kamerasıyla izleniyor. En dış kapı yalnızca apartta kalan öğrencilere verilen sensörlü anahtarlıkla açılıyor; dışarıdan biri kendi başına içeri giremez.",
        },
        {
          q: "Binada görevli var mı?",
          a: "Sabahtan akşam 18.00'e kadar görevlimiz binada bulunuyor. Bu saatlerin dışında güvenlik, girişte ve her katta kesintisiz kayıt alan kameralarla ve sensörlü kapı sistemiyle sağlanıyor.",
        },
        {
          q: "Odama haber vermeden girilir mi?",
          a: "Hayır. Oda senindir; acil bir durum olmadıkça haber verilmeden kapın açılmaz.",
        },
        {
          q: "Misafir kabul edilebiliyor mu?",
          a: "Öğrencilerin girişinde, ailelerinin yerleşmeyi yapabilmesi için misafir kabul edilir.",
        },
      ],
    },
    {
      title: "Ücretler ve sözleşme",
      items: [
        {
          q: "Fiyatlar ne kadar?",
          a: "Fiyat dönem başında güncelleniyor ve odaya göre değişiyor, bu yüzden siteye sabit bir rakam yazmıyoruz. Aradığında o günün net rakamını, depozitoyu ve varsa kardeş indirimini açık açık konuşuyoruz.",
        },
        {
          q: "İnternet, su, elektrik ve doğalgaz ücrete dahil mi?",
          a: "Hepsi kirada. İnternet, su, elektrik ve doğalgaz için ayrıca fatura gelmez; aidat, ısınma payı gibi ek kalemler de yok. Ay sonunda sürpriz çıkmaz.",
        },
        {
          q: "Sözleşme kaç aylık?",
          a: "Standart sözleşme 9 aylıktır (Eylül–Haziran). Yaz döneminde kalmak isteyenler için aylık seçenek de var.",
        },
        {
          q: "Depozito alınıyor mu?",
          a: "Evet, bir aylık kira tutarında depozito alıyoruz. Sözleşme süresi dolduğunda, odada olağan kullanım dışında bir hasar yoksa ve ödemeler tamamlandıysa depozito çıkış gününden itibaren en geç on beş gün içinde iade edilir.",
        },
        {
          q: "Vazgeçersem ne oluyor?",
          a: "Taşınmadan önce vazgeçersen ön kayıt bir bağlayıcılık taşımaz. Sözleşme başladıktan sonra çıkmak istersen bir ay önceden bildirim yeterlidir; bildirim süresine uyulduğunda depozito kesintisi uygulanmaz.",
        },
      ],
    },
    {
      title: "Konum ve kayıt",
      items: [
        {
          q: "Üniversitelere ne kadar uzaksınız?",
          a: "Anadolu Üniversitesi'ne yürüyerek 5 dakika, Osmangazi Üniversitesi'ne tramvayla 12 dakika. Tramvay durağı bir dakika mesafede ve şehrin çoğu noktasına aktarmasız gidiliyor.",
        },
        {
          q: "Apartı gezebilir miyim?",
          a: "Elbette. Randevusuz da gelebilirsin ama önceden arayıp gelirsen seni karşılayacak birini ve gezebileceğin boş odaları hazır bulursun. Ailenle birlikte gelmeni özellikle isteriz.",
        },
        {
          q: "Kayıt için hangi belgeler gerekiyor?",
          a: "Kimlik fotokopisi, öğrenci belgesi ve veli iletişim bilgisi yeterlidir. On sekiz yaşından küçük öğrencilerde sözleşmeyi veli imzalar. Belgeleri kayıt günü getirebilirsin; ön kayıt için hiçbir belgeye gerek yoktur.",
        },
        {
          q: "Ön kayıt beni bağlar mı?",
          a: "Hayır. Ön kayıt sadece seninle iletişime geçip sana uygun odayı ayırabilmemiz için. İstediğin an vazgeçebilirsin.",
        },
      ],
    },
  ],

  en: [
    {
      title: "Rooms and the flat",
      items: [
        {
          q: "Are the rooms furnished?",
          a: "Yes, fully furnished. Each room has a bed, a study desk, a comfortable study chair, a bookshelf and a wardrobe. The flat has a kitchen with white goods, a bathroom, a living area and a washing machine. Just bring your suitcase.",
        },
        {
          q: "What is the difference between a single and a twin room?",
          a: "In a single room the whole space is yours. Each flat contains two single rooms, so two people share the flat. A twin room has two beds and two of everything: two desks, two chairs, two bookshelves, two wardrobes. The flat layout is the same in both cases.",
        },
        {
          q: "Is there a shared laundry room?",
          a: "There is no shared laundry, and none is needed: every flat has its own washing machine. You never wait in line and can do your laundry whenever you like.",
        },
        {
          q: "Is there a shared study hall?",
          a: "There is no separate study hall. Every room has its own desk, chair and bookshelf, so you do not need to go anywhere else to study.",
        },
        {
          q: "How many people share the kitchen and bathroom?",
          a: "They are shared per flat. With single rooms, two people use the flat; a twin room follows the same flat layout. There is no crowded corridor-wide bathroom or kitchen.",
        },
      ],
    },
    {
      title: "Safety and access",
      items: [
        {
          q: "Is there a curfew?",
          a: "No, we do not impose entry hours. The entrance and every floor are monitored by security cameras around the clock. The outer door only opens with a sensor fob given to residents, so nobody from outside can let themselves in.",
        },
        {
          q: "Is there staff in the building?",
          a: "Our member of staff is in the building from morning until 6 pm. Outside those hours, security is provided by cameras recording continuously at the entrance and on every floor, together with the sensor door system.",
        },
        {
          q: "Can someone enter my room without telling me?",
          a: "No. The room is yours; unless there is an emergency, nobody opens your door without letting you know first.",
        },
        {
          q: "Are guests allowed?",
          a: "Guests are welcome at move-in, so that families can help their daughters settle in.",
        },
      ],
    },
    {
      title: "Fees and contract",
      items: [
        {
          q: "How much does it cost?",
          a: "Prices are updated at the start of each term and vary by room, so we do not publish a fixed figure. When you call, we give you the exact figure for the day, the deposit and any sibling discount.",
        },
        {
          q: "Are internet, water, electricity and gas included?",
          a: "All of them are in the rent. There is no separate bill for internet, water, electricity or gas, and no extra charges for maintenance or heating. Nothing unexpected at the end of the month.",
        },
        {
          q: "How long is the contract?",
          a: "The standard contract is nine months (September to June). A monthly option is available for those who want to stay over the summer.",
        },
        {
          q: "Is there a deposit?",
          a: "Yes, a deposit equal to one month's rent. At the end of the contract, if there is no damage beyond normal use and payments are complete, the deposit is returned within fifteen days of the move-out date.",
        },
        {
          q: "What if I change my mind?",
          a: "A booking request is not binding before you move in. Once the contract has started, one month's notice is enough; if you give that notice, nothing is deducted from your deposit.",
        },
      ],
    },
    {
      title: "Location and registration",
      items: [
        {
          q: "How far are the universities?",
          a: "Anadolu University is a five-minute walk and Osmangazi University is twelve minutes by tram. The tram stop is one minute away and reaches most of the city without a transfer.",
        },
        {
          q: "Can I visit the residence?",
          a: "Of course. You can drop by without an appointment, but if you call first you will find someone to meet you and the free rooms ready to see. We especially encourage you to come with your family.",
        },
        {
          q: "Which documents do I need to register?",
          a: "A copy of your ID, a student certificate and a parent's contact details are enough. For students under eighteen the contract is signed by a parent. You can bring the documents on registration day; no document is needed for a booking request.",
        },
        {
          q: "Does a booking request commit me to anything?",
          a: "No. It simply lets us contact you and hold the room that suits you. You can change your mind at any time.",
        },
      ],
    },
  ],
};

const copy = {
  tr: {
    eyebrow: "Sık Sorulan Sorular",
    title: "Merak edilen her şey, tek sayfada.",
    lead: "Aradığın cevap burada yoksa telefonu aç, sor. Bilmediğimiz bir şeyi uydurmuyoruz.",
    meta: ["Odalar", "Güvenlik", "Ücretler", "Kayıt"],
    breadcrumbHome: "Ana sayfa",
  },
  en: {
    eyebrow: "Frequently Asked Questions",
    title: "Everything people ask, on one page.",
    lead: "If the answer you need is not here, just call and ask. We never make things up.",
    meta: ["Rooms", "Safety", "Fees", "Registration"],
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
    path: "/sss",
    title:
      l === "tr"
        ? "Sık Sorulan Sorular | Eskişehir Kız Öğrenci Apartı"
        : "Frequently Asked Questions | Girls' Residence in Eskişehir",
    description:
      l === "tr"
        ? "Fiyata neler dahil, depozito, sözleşme süresi, giriş-çıkış saati, güvenlik, internet ve kayıt belgeleri. Bala Kız Apartı hakkında tüm cevaplar."
        : "What the fee includes, deposit, contract length, curfew, security, internet and registration documents. Every answer about Bala Girls' Residence.",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  const c = copy[l];
  const base = l === "tr" ? "" : "/en";
  const all = groups[l].flatMap((g) => g.items);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: c.breadcrumbHome, url: base || "/" },
            { name: c.eyebrow, url: `${base}/sss` },
          ]),
          faqSchema(all.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <PageHeader index="01" eyebrow={c.eyebrow} title={c.title} lead={c.lead} meta={[...c.meta]} />

      <Section className="pt-0">
        <Container>
          <div className="space-y-16 sm:space-y-20">
            {groups[l].map((g, i) => (
              <div key={g.title}>
                <Reveal>
                  <Eyebrow index={String(i + 2).padStart(2, "0")}>{g.title}</Eyebrow>
                </Reveal>
                <SplitText
                  as="h2"
                  text={g.title}
                  className="mt-5 font-display text-h2 font-bold text-balance"
                />
                <Reveal delay={0.1}>
                  <Accordion items={g.items} className="mt-8" />
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBlock locale={l} />
    </>
  );
}
