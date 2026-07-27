"use client";

import { ReactNode } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ประเภทของ Alert
export type AlertVariant = "success" | "error" | "warning" | "info";

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void; // ถ้ามี จะกลายเป็น Confirm Modal ทันที
  title: string;
  description?: string | ReactNode;
  variant?: AlertVariant;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

// กำหนดไอคอนและโทนสีตามประเภท Alert
const variantConfig: Record<
  AlertVariant,
  { icon: LucideIcon; color: string; bgColor: string }
> = {
  success: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  info: {
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
};

export default function CustomAlert({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  variant = "info",
  confirmText = "ตกลง",
  cancelText = "ยกเลิก",
  isLoading = false,
}: CustomAlertProps) {
  if (!isOpen) return null;

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* ตัวการ์ด Alert */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-sm w-full p-6 text-center transform transition-all animate-in zoom-in-95 duration-200">
        {/* ไอคอนตาม Variant */}
        <div
          className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4 ${config.bgColor}`}
        >
          <Icon className={`w-8 h-8 ${config.color}`} />
        </div>

        {/* หัวข้อ & รายละเอียด */}
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
          {title}
        </h3>

        {description && (
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {description}
          </div>
        )}

        {/* ปุ่ม Action */}
        <div className="flex gap-2 justify-center mt-6">
          {/* ถ้าส่ง onConfirm มา ให้แสดงปุ่ม "ยกเลิก" คู่กับปุ่ม "ตกลง" */}
          {onConfirm ? (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 rounded-xl h-11 border-slate-200"
              >
                {cancelText}
              </Button>
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                className={`flex-1 rounded-xl h-11 text-black font-semibold ${
                  variant === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {isLoading ? "กำลังบันทึก..." : confirmText}
              </Button>
            </>
          ) : (
            /* กรณีเป็น Alert แจ้งเตือนธรรมดา มีแค่ปุ่มรับทราบปุ่มเดียว */
            <Button
              onClick={onClose}
              className="w-full text-black rounded-xl h-11 bg-yellow-500 hover:bg-yellow-600 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 font-semibold"
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
