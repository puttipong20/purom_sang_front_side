import { Metadata } from "next";
import Image from "next/image";

// 1. 🎯 Metadata สำหรับ Search Engine & Social Media
export const metadata: Metadata = {
  title: "ภูร่มแสง | ที่พักรายวันใกล้ ม่อนแจ่ม โป่งแยง ฟาร์มแกะ เชียงใหม่",
  description:
    "สัมผัสบรรยากาศธรรมชาติที่ ภูร่มแสง ที่พักรายวันใกล้ม่อนแจ่ม ปราสาทดอกไม้ ฟาร์มแกะ โป่งแยงซิปไลน์ ยิ่งยงสวนดอกไม้ เดินทางสะดวก บรรยากาศดีที่สุด",
  keywords: [
    "ภูร่มแสง",
    "ที่พักม่อนแจ่ม",
    "ที่พักใกล้โป่งแยง",
    "ที่พักใกล้ฟาร์มแกะ",
    "ที่พักเชียงใหม่",
    "ที่พักใกล้ปราสาทดอกไม้",
    "ยิ่งยงสวนดอกไม้ ที่พัก",
  ],
  openGraph: {
    title: "ภูร่มแสง | ที่พักรายวันใกล้ ม่อนแจ่ม โป่งแยง",
    description:
      "พักผ่อนท่ามกลางธรรมชาติใกล้แหล่งท่องเที่ยวชื่อดังม่อนแจ่ม ยิ่งยงสวนดอกไม้ และโป่งแยงซิปไลน์",
    url: "https://phuromshang.com", // ⚠️ เปลี่ยนเป็น Domain จริงของคุณ
    siteName: "ภูร่มแสง",
    images: [
      {
        url: "https://oxemxjxvyymejjxcubxo.supabase.co/storage/v1/object/public/purom_sang_img/1.jpg",
        width: 1200,
        height: 630,
        alt: "บรรยากาศที่พักภูร่มแสง ใกล้ม่อนแจ่ม",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  alternates: {
    canonical: "https://phuromshang.com", // ⚠️ เปลี่ยนเป็น Domain จริงของคุณ
  },
};

export default function Home() {
  // 2. 🏷️ Structured Data (Hotel/Lodging Schema) ช่วยให้ Google ขึ้นการ์ดที่พัก
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "ภูร่มแสง",
    image:
      "https://oxemxjxvyymejjxcubxo.supabase.co/storage/v1/object/public/purom_sang_img/1.jpg",
    description:
      "ที่พักรายวันใกล้ ม่อนแจ่ม ปราสาทดอกไม้ ฟาร์มแกะ โป่งแยงซิปไลน์จังเกิ้ล ยิ่งยงสวนดอกไม้",
    address: {
      "@type": "PostalAddress",
      addressLocality: "แม่ริม",
      addressRegion: "เชียงใหม่",
      addressCountry: "TH",
    },
    priceRange: "$$",
  };

  return (
    <main className="w-full">
      {/* ฝัง Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative mx-auto">
        {/* Banner */}
        <div className="relative h-screen overflow-hidden">
          <Image
            src="https://monvsxbkhlvlhiacdmnc.supabase.co/storage/v1/object/public/rooms/main_img/home_page.jpg"
            alt="ภูร่มแสง ที่พักรายวันใกล้ม่อนแจ่ม บรรยากาศธรรมชาติ" // ⚠️ alt ที่มี Keyword ชัดเจน
            priority
            fill
            sizes="100vw" // 💡 ช่วยเรื่อง Performance & Core Web Vitals
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <header className="w-[85%] md:w-[65%] lg:w-[50%] rounded-xl bg-black/40 backdrop-blur-sm px-6 py-6 border border-white/10 text-center">
              {/* H1 สำหรับชื่อที่พัก */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-wide">
                ภูร่มแสง
              </h1>

              {/* H2 หรือ p สำหรับ Keyword สถานที่ใกล้เคียง */}
              <h2 className="text-lg md:text-2xl font-medium text-slate-100 leading-relaxed">
                ที่พักรายวันใกล้{" "}
                <span className="font-semibold text-yellow-300">ม่อนแจ่ม</span>{" "}
                ปราสาทดอกไม้ ฟาร์มแกะ โป่งแยงซิปไลน์จังเกิ้ล ยิ่งยงสวนดอกไม้
              </h2>

              <div className="mt-6 flex justify-center gap-4">
                {/* ปุ่ม Call to Action (CTA) เพิ่ม User Engagement */}
                <a
                  href="/rooms"
                  className="bg-yellow-300 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-all shadow-lg text-sm md:text-base"
                >
                  ดูห้องพักทั้งหมด
                </a>
              </div>
            </header>
          </div>
        </div>
      </section>
    </main>
  );
}