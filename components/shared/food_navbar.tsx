"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { token, totalCount } = useCart();
  const isHome = pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [token]);

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        isHome
          ? `fixed top-0 left-0 ${
              isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`
          : "sticky top-0 bg-white shadow"
      }`}
    >
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={`/food_order/${token}`}
          className="flex flex-1 items-center space-x-3 rtl:space-x-reverse min-w-0"
        >
          <Image
            src="/logo.png"
            className="h-auto rounded-xl"
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="self-center text-xl text-heading font-semibold truncate">
            ภูร่มแสง
          </span>
        </Link>

        {/* ปุ่มแฮมเบอร์เกอร์เมนู */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            className="flex p-3 touch-manipulation text-heading active:scale-95 relative z-50 md:hidden"
            onClick={() => setIsOpen(true)}
          >
            {/* ใส่ pointer-events-none บังคับให้นิ้วทะลุโดนปุ่ม 100% ไม่ติดเส้น SVG */}
            <p className="mr-2">{totalCount}</p>
            <Menu className="w-6 h-6 pointer-events-none" />
          </button>
        </div>

        {/* Overlay (ฉากหลังโปร่งแสง) - เปิดใช้งานและสลับ pointer-events */}
        <div
          onClick={() => setIsOpen(false)}
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-40 ${
            isOpen
              ? "opacity-100 pointer-events-auto visible"
              : "opacity-0 pointer-events-none invisible"
          }`}
        />

        {/* Drawer Menu (เมนูด้านข้าง) - เลื่อนเข้า-ออกอย่างสมูท */}
        <div
          className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-50 p-6 
          transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between pb-6 border-b">
            <span className="text-xl font-bold">ภูร่มแสง</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100"
            >
              ✕
            </button>
          </div>

          <div className="py-6">
            <ul className="space-y-6 text-lg">
              <li>
                <Link
                  href={`/food_order/${token}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 hover:text-fg-brand"
                >
                  หน้าหลัก
                </Link>
              </li>
              <li className="flex justify-between">
                <Link
                  href={`/food_order/${token}/cart`}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 hover:text-fg-brand"
                >
                  cart
                </Link>
                <p>{totalCount}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary items-center">
            <li>
              <Link
                href={`/food_order/${token}`}
                className="block py-2 px-3 text-heading rounded md:bg-transparent md:text-fg-brand md:p-0"
              >
                หน้าหลัก
              </Link>
            </li>
            <li>
              <Link
                href={`/food_order/${token}/cart`}
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"
              >
                cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
