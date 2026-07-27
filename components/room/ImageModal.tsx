// components/ImageLightboxModal.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type ImageLightboxModalProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

export default function ImageLightboxModal({
  src,
  alt,
  className,
  fill,
  priority,
  sizes,
}: ImageLightboxModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ปิด Modal เมื่อกดปุ่ม Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden"; // ป้องกันการสกรอลล์พื้นหลัง
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* รูปภาพที่แสดงบนหน้าเว็บปกติ (เมื่อคลิกจะเปิด Modal) */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer h-full w-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          sizes={sizes}
          className={className}
        />
      </div>

      {/* Modal / Lightbox ป๊อปอัปภาพขยายใหญ่ */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)} // คลิกพื้นที่ด้านนอกเพื่อปิด
        >
          {/* ปุ่มปิด X มุมขวาบน */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all duration-200 focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* กล่องแสดงภาพใหญ่ */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()} // ป้องกันไม่ให้คลิกที่ตัวภาพแล้วปิด Modal
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain" // ใช้ object-contain เพื่อให้ภาพไม่โดนครอบและเห็นครบทั้งภาพ
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}