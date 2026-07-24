import Image from "next/image";
import React from "react";

export default function layout() {
  return (
    <div className=" min-h-[calc(100vh-100px)]">
      <div className=" flex border-2 bg-[#efefe9] flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex items-center ">
          <div className="mx-6 my-4 pl-4 md:ml-16 md:pl-8text-start border-l-2 border-gray-400">
            <p className="text-3xl md:text-5xl">
              ภูร่มแสง
              <span className="text-2xl md:text-2xl"> โฮมสเตย์</span>
            </p>
            <p className="pt-3 text-xl md:text-2xl">
              สร้างความทรงจำอันล้ำค่าให้กับทุกการพักผ่อน
            </p>
            <br />
            <span className="indent-8">
              โอบล้อมด้วยธรรมชาติ ท่ามกลางขุนเขาที่เบลล์ วิลล่า รีสอร์ท
              มาพักกายพักใจ พร้อมด้วยการบริการที่ดีที่สุด
              และห้องพักดีไซน์ร่วมสมัยในบรรยากาศที่อบอุ่นน่าอยู่
              และผ่อนคลายลงตัวพร้อมต้อนรับทุกท่าน <br />
              <br />
              <span className="indent-8">
                ห้องถูกออกแบบและตกแต่งเน้นความเรียบง่าย
                ตกแต่งร่วมกันระหว่างวัสดุที่เฉพาะตัว ผสมผสานรูปแบบในสไตล์ต่าง ๆ
                เข้าด้วยกันได้อย่างลงตัว
              </span>
              ท่ามกลางธรรมชาติที่จะนำพาทุกท่านเข้าสู่โหมดการพักผ่อน
              อย่างเป็นส่วนตัว และสามารถเพลิดเพลินไปกับสิ่งอำนวยความสะดวก
              เรามุ่งมั่นพัฒนาการบริการและสิ่งอำนวยความสะดวกอย่างต่อเนื่องเพื่อมอบประสบการณ์การพักผ่อนที่ดีที่สุดแก่คุณ
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2  flex justify-center md:justify-end">
          <Image
            src="https://oxemxjxvyymejjxcubxo.supabase.co/storage/v1/object/public/purom_sang_img/1.jpg"
            width={500}
            height={500}
            alt="purom_sang_1"
            className="block w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className=" flex border-2 bg-[#e8d9cd] flex-col md:flex-row">
        <div className="w-full md:w-1/2  flex justify-center md:justify-end">
          <Image
            src="https://oxemxjxvyymejjxcubxo.supabase.co/storage/v1/object/public/purom_sang_img/2.jpg"
            width={500}
            height={500}
            alt="purom_sang_1"
            className="block w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center ">
          <div className="mx-6 my-4 pr-4 md:ml-16 md:pl-8 text-end border-r-2 border-gray-400">
            <p className="text-3xl md:text-5xl">เรื่องราว</p>
            <span className="text-2xl md:text-2xl">ภูร่มแสง</span>
            <br />
            <span className="indent-8">
              เราเริ่มเปิดบริการตั้งแต่ปี 2560 ณ ตอนนั้นม่อนแจ่มกำลังได้รับความนิยมสูงขึ้นเรื่อย ๆ จึงได้มี
              การริเริ่มทำห้องพัก โดยทำเป็นลานกางเต้นท์หรือกระโจมผ้ายังไม่ใช่เต้นผ้าใบพลาสติกและได้มี
              การพัฒนามาเป็นโดมที่เป็นผ้าใบพลาสติก และพัฒนาเป็นบ้านพักเป็นหลังจนถึงทุกวันนี้
            </span>
          </div>
        </div>
      </div>
      <div className=" flex border-2 bg-[#e8d9cd] flex-col md:flex-row">
        <div className="w-full md:w-1/2  flex justify-center md:justify-end">
          <Image
            src="https://oxemxjxvyymejjxcubxo.supabase.co/storage/v1/object/public/purom_sang_img/3.jpg"
            width={500}
            height={500}
            alt="purom_sang_1"
            className="block w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2  flex justify-center md:justify-end">
          <Image
            src="https://oxemxjxvyymejjxcubxo.supabase.co/storage/v1/object/public/purom_sang_img/4.jpg"
            width={500}
            height={500}
            alt="purom_sang_1"
            className="block w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
