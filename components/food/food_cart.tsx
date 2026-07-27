"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import _ from "lodash";
import { createClient } from "@/lib/supabase/client";
import CustomAlert from "../ui/alert";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // ค่าบน Client
    () => false, // ค่าบน Server (SSR)
  );
}

export default function CartPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;
  const isMounted = useIsMounted();
  const supabase = createClient();
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isMounted) return null;

  // ฟังก์ชันส่งคำสั่งซื้อ
  const handleOrder = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    setIsSubmitting(true);

    try {
      // TODO: ยิง API สั่งอาหารไปยัง Supabase / Backend ของคุณ
      // const res = await fetch('/api/order', { body: JSON.stringify({ token, items: cartItems }) })
      const result = _.map(cartItems, (item) => ({
        food_name: item.food.food_name,
        food_price: item.food.food_price,
        food_quantity: item.quantity,
      }));
      const new_result = [
        {
          room_id: token,
          order_list: result,
        },
      ];
      const { error } = await supabase.from("food_order").insert(new_result);
      if (error) {
        throw error;
      }
      setLoading(false);
      setShowConfirm(false);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const clear_cart = () => {
    clearCart(); // ล้างตะกร้าเมื่อสั่งซื้อสำเร็จ
    router.push(`/food_order/${token}`); // พากลับไปหน้าเลือกอาหาร
    setShowAlert(false);
  };

  // กรณีไม่มีสินค้าในตะกร้า
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-700">
          ไม่มีรายการในตะกร้า
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          คุณยังไม่ได้เลือกเมนูอาหารใดๆ
        </p>
        <Link href={`/food_order/${token}`}>
          <Button variant="default">กลับไปเลือกเมนูอาหาร</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-12">
      {/* ปุ่มย้อนกลับ */}
      <Link
        href={`/food_order/${token}`}
        className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4"
      >
        <Button className="bg-gray-400">ย้อนกลับ</Button>
      </Link>

      {/* 📄 ตัวการ์ดสไตล์บิล/สลิป */}
      <Card className="border-2 border-slate-200 shadow-md relative overflow-hidden bg-white">
        {/* 1. Header บิล (ชื่อห้อง/โต๊ะ) */}
        <CardHeader className="text-center border-b border-dashed border-slate-300 pb-4 pt-6 bg-slate-50/50">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
            RECEIPT / ใบสั่งอาหาร
          </div>
          <h1 className="text-xl font-extrabold text-slate-800">รายการอาหาร</h1>
        </CardHeader>

        {/* 2. หัวตารางรายการ */}
        <CardContent className="p-4 pt-5">
          <div className="grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-200">
            <span className="col-span-6">รายการ</span>
            <span className="col-span-3 text-center">จำนวน</span>
            <span className="col-span-3 text-right">รวม</span>
          </div>

          {/* 3. รายการอาหารแต่ละแถว */}
          <div className="divide-y divide-dashed divide-slate-100 my-2">
            {cartItems.map((item) => {
              const itemTotal = item.food.food_price * item.quantity;

              return (
                <div
                  key={item.food.id}
                  className="grid grid-cols-12 items-center py-3 text-sm"
                >
                  {/* ชื่ออาหาร & ราคาต่อชิ้น */}
                  <div className="col-span-6 pr-2">
                    <p className="font-medium text-slate-800 line-clamp-1">
                      {item.food.food_name}
                    </p>
                    <p className="text-xs text-slate-400">
                      ฿{item.food.food_price}
                    </p>
                  </div>

                  {/* ปุ่มปรับจำนวน (- / +) */}
                  <div className="col-span-3 flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => decreaseQuantity(item.food.id)}
                      className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-slate-700 text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item.food)}
                      className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* ราคารวมแถว & ปุ่มลบ */}
                  <div className="col-span-3 text-right flex items-center justify-end gap-2">
                    <span className="font-bold text-slate-800">
                      ฿{itemTotal}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.food.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                      title="ลบรายการ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. สรุปราคารวมทั้งหมด */}
          <div className="border-t-2 border-dashed border-slate-300 pt-4 mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm text-slate-500">
              <span>จำนวนรวมทั้งหมด</span>
              <span>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} รายการ
              </span>
            </div>

            <div className="flex justify-between items-center text-lg font-extrabold text-slate-900 pt-1">
              <span>ราคารวมทั้งสิ้น</span>
              <span className="text-xl">฿{totalPrice}</span>
            </div>
          </div>
        </CardContent>

        {/* 5. ปุ่มยืนยันสั่งอาหาร */}
        <CardFooter className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
          <Button
            onClick={() => setShowConfirm(true)}
            disabled={isSubmitting}
            className="w-full h-12 text-base text-balck font-bold bg-yellow-500 hover:bg-yellow-600 active:scale-[0.99] transition-all shadow-md"
          >
            {isSubmitting ? "กำลังส่งออเดอร์..." : "ยืนยันสั่งอาหาร"}
          </Button>

          <p className="text-[11px] text-center text-slate-400 mt-1">
            * เมื่อกดสั่งอาหารแล้ว รายการจะถูกส่งตรงไปยังห้องครัวทันที
          </p>
        </CardFooter>
      </Card>
      <CustomAlert
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleOrder}
        isLoading={loading}
        variant="warning"
        title="ยืนยันการสั่งอาหาร?"
        description="เมื่อยืนยันแล้วรายการอาหารจะไม่สามารถยกเลิกได้"
        confirmText="ยืนยันสั่งซื้อ"
        cancelText="ตรวจสอบอีกครั้ง"
      />
      <CustomAlert
        isOpen={showAlert}
        onClose={() => clear_cart()}
        variant="success"
        title="สั่งอาหารสำเร็จ!"
        description="รายการอาหารของคุณถูกส่งไปยังห้องครัวเรียบร้อยแล้ว"
        confirmText="ตกลง"
      />
    </div>
  );
}
