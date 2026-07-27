import Link from "next/link";
import { FaFacebook, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        {/* Left */}
        <p className="text-sm text-gray-600">
          © 2026 Purom saeng, All rights reserved.
        </p>

        {/* Right */}
        <div className="box flex items-center gap-6">
          <Link
            href="https://www.facebook.com/PhuromShang/"
            target="_blank"
            className="text-gray-500 transition hover:text-gray-900"
          >
            <Button variant={"outline"}>
              <FaFacebook size={22} />
            </Button>
          </Link>
          <Link
            href="tel:0637985553"
            className="text-gray-500 transition hover:text-gray-900"
          >
            <Button variant={"outline"}>
              <Phone size={22} className="w-4 h-4" />
            </Button>
          </Link>
          {/* <Link
            href="#"
            className="text-gray-500 transition hover:text-gray-900"
          >
            <FaYoutube size={22} />
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
