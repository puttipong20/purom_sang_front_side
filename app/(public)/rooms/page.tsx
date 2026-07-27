import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function RoomsPage() {
  const supabase = await createClient();

  const { data: rooms, error } = await supabase.from("rooms").select("*");
  if (error) {
    console.log(error);
    throw error;
  }
  console.log(rooms);
  return (
    <main className="mx-auto w-full border-2 px-10 md:px-20 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">ห้องพักของเรา</h1>

        <p className="mt-3 text-muted-foreground">
          เลือกประสบการณ์การพักผ่อนของคุณ
        </p>
      </div>

      {/* Grid */}
      <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {rooms?.map((room) => (
          <Card
            key={room.id}
            className="p-0 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-200 flex flex-col justify-between"
          >
            <div>
              {/* 1. 🖼️ รูปภาพเต็มชิดขอบการ์ดด้านบน */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={room.room_main_img}
                  alt={room.room_name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* 2. 📝 ชื่อ รายละเอียด และราคา */}
              <CardContent className="p-5">
                <div className="flex justify-between items-start gap-4">
                  {/* ซ้าย: ชื่อห้อง + รายละเอียดใต้ชื่อ (ตัวหนังสือสีเทา) */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-xl font-bold text-slate-800 line-clamp-1">
                      {room.room_name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {room.room_description_short}
                    </p>
                  </div>

                  {/* ขวา: ราคาขวาสุด */}
                  {/* <div>
                    <div className="text-right flex items-baseline whitespace-nowrap pt-0.5">
                      <div className=" pr-3 text-sm ml-2 text-slate-400 font-medium">
                        มี.ค - ก.ย
                      </div>
                      <div className="text-2xl font-extrabold text-yellow-500">
                        ฿{room.room_low_price}
                      </div>
                      <div className="text-sm ml-2 text-slate-400 font-medium">
                        / คืน
                      </div>
                    </div>
                    <div className="text-right flex items-baseline whitespace-nowrap pt-0.5">
                      <div className=" pr-3 text-sm ml-2 text-slate-400 font-medium">
                        ต.ค - ก.พ
                      </div>
                      <div className="text-2xl font-extrabold text-yellow-500">
                        ฿{room.room_high_price}
                      </div>
                      <div className="text-sm ml-2 text-slate-400 font-medium">
                        / คืน
                      </div>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </div>

            {/* 3. 🔘 ปุ่มรายละเอียดด้านล่างการ์ด */}
            <CardFooter className="p-5 pt-0 flex items-center justify-center ">
              <Link href={`/rooms/${room.id}`} className="m-0 mt-4">
                <Button className="w-full h-11 bg-yellow-300 text-black cursor-pointer hover:bg-yellow-400 hover:text-black transition-all font-medium rounded-xl">
                  ดูรายละเอียดห้องพัก
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
