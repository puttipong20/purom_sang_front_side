import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full border">
      <div className="relative mx-auto ">
        {/* Banner */}
        <div className="relative h-screen overflow-hidden">
          {/* <div className="relative h-screen overflow-hidden rounded-2xl"> */}
          <Image
            src="https://oxemxjxvyymejjxcubxo.supabase.co/storage/v1/object/public/purom_sang_img/1.jpg"
            alt="Pool Villa"
            priority
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center ">
            <div className="w-[80%] md:w-[65%] lg:w-[50%] rounded-xl bg-black/30 backdrop-blur-sm px-8 py-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                ภูร่มแสง
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                enim.
              </p>
              <div className="text-center">

                <Button variant={'outline'} className="border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all rounded-md font-normal px-4 py-2">
                  <Link href={"/rooms"}>ห้องพัก</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
