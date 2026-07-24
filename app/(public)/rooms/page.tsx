
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function RoomsPage() {
  const supabase = await createClient();

  const { data: rooms } = await supabase
    .from("rooms")
    .select("*");

  return (
    <main className="mx-auto w-full border-2 px-10 md:px-20 py-12">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">
          ห้องพักของเรา
        </h1>

        <p className="mt-3 text-muted-foreground">
          เลือกห้องพักที่เหมาะกับการพักผ่อนของคุณ
        </p>
      </div>

      {/* Grid */}
      <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {rooms?.map((room) => (
          <Card
            key={room.id}
            className=" overflow-hidden  duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className=" relative h-64 w-full border-red-600 border-2 mt-0 pt-0">
              <Image
                src={room.room_main_img}
                alt={room.room_name}
                fill
                className="object-cover py-0 mx-0 border-2"
              />
            </div>

            <CardContent className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {room.room_name}
                </h2>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  ฿{room.room_price ? room.room_price: 1000}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    / คืน
                  </span>
                </p>
              </div>
            </CardContent>

            <CardFooter className="gap-3">
              <Button
                variant="outline"
                className="flex-1"
              >
                <Link href={`/rooms/${room.id}`}>
                  รายละเอียด
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

      </div>
    </main>
  );
}