import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server"; // หรือทางนำเข้า supabase client ฝั่ง server ของคุณ
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import ImageLightboxModal from "@/components/room/ImageModal";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function DetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !room) {
    return (
      <div className="p-8 text-center text-red-500">
        ไม่พบข้อมูลห้องพัก (ID: {id})
      </div>
    );
  }
  console.log(room);
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ปุ่มย้อนกลับ */}
        <Link
          href={`/rooms`}
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4"
        >
          <Button className="bg-gray-400">ย้อนกลับ</Button>
        </Link>

        {/* 📦 Layout หลัก: แบ่งซ้าย-ขวา */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============================================== */}
          {/* 🖼️ ฝั่งซ้าย (lg:col-span-7): แกลเลอรีรูปภาพ   */}
          {/* ============================================== */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. รูปหลักด้านบน */}
            <div className="relative h-87.5 sm:h-112.5 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <Image
                src={room.room_main_img}
                alt={room.room_name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            {/* 2. รูปอื่นๆ ด้านล่าง (Gallery Thumbnails) */}
            {room.room_gallery_img.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-500 mb-3">
                  ภาพบรรยากาศเพิ่มเติม
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {room.room_gallery_img.map(
                    (imgUrl: string, index: number) => (
                      <div
                        key={index}
                        className="relative h-24 sm:h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group cursor-pointer"
                      >
                        <ImageLightboxModal
                          src={imgUrl}
                          alt={`${room.room_name} image ${index + 1}`}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ============================================== */}
          {/* 📝 ฝั่งขวา (lg:col-span-5): รายละเอียด & ราคา */}
          {/* ============================================== */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 lg:sticky lg:top-8">
            {/* ชื่อห้องพัก & ที่ตั้ง */}
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold  bg-yellow-200 w-fit px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5" /> ม่อนแจ่ม - หนองหอยใหม่
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {room.room_name}
              </h1>
            </div>

            {/* ราคาต่อคืน */}
            <div>
              <div className="flex items-baseline gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className=" pr-3 text-sm ml-2 text-slate-400 font-medium">
                  มี.ค - ก.ย
                </div>
                <span className="text-3xl font-extrabold text-yellow-500">
                  ฿{room.room_low_price}
                </span>
                <span className="text-slate-500 font-medium">/ คืน</span>
              </div>
              <div className="flex items-baseline gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className=" pr-3 text-sm ml-2 text-slate-400 font-medium">
                  มี.ค - ก.ย
                </div>
                <span className="text-3xl font-extrabold text-yellow-500">
                  ฿{room.room_high_price}
                </span>
                <span className="text-slate-500 font-medium">/ คืน</span>
              </div>
            </div>

            {/* สิ่งอำนวยความสะดวกพื้นฐาน (ตัวอย่าง) */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                การบริการ & สิ่งอำนวยความสะดวก
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                {room.room_service.map((item: string) => (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ปุ่มจอง / ติดต่อสอบถาม */}
            <div className="pt-4 space-y-3">
              <Link href={"https://www.facebook.com/PhuromShang/"}>
                <Button
                  size="lg"
                  className="cursor-pointer w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold h-12 rounded-xl text-base shadow-md hover:shadow-lg transition-all"
                >
                  จองห้องพักนี้
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-slate-400" />{" "}
                จองตรงกับที่พัก ปลอดภัย 100%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
