"use client";
import { Food_type } from "@/types/food_type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface Food_props {
  foods: Food_type[];
  token: string;
}
export default function FoodList({ foods, token }: Food_props) {
  const { setToken, addToCart } = useCart();
  const {totalCount} = useCart()
  useEffect(() => {
    const set_token = async () => {
      if (token) {
        await setToken(token);
      }
    };
    set_token();
  }, [token, setToken]);
  return (
    <div className="mx-5 mt-4">
      {foods.length > 0 ? (
        foods.map((item: Food_type) => (
          <Card
            key={item.id}
            className="overflow-hidden p-0 border-2 mt-4 border-muted"
          >
            <CardContent className="p-3 flex items-center gap-4">
              {/* 1. รูปภาพฝั่งซ้าย */}
              <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-muted">
                {item.food_img ? (
                  <Image
                    src={item.food_img}
                    alt={item.food_name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    ไม่มีรูป
                  </div>
                )}
              </div>

              {/* 2. รายละเอียดและปุ่มฝั่งขวา */}
              <div className="flex-1 flex flex-col justify-between h-24 py-1">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {item.food_name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    เมนูแนะนำประจำร้าน
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-base font-bold text-primary">
                    ฿{item.food_price}
                  </span>

                  {/* ปุ่ม Button จาก shadcn/ui */}
                  <Button
                    size="sm"
                    className="h-8 px-3 text-xs"
                    onClick={() => addToCart(item)}
                  >
                    + เพิ่ม
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>ไม่มีข้อมูล</p>
      )}
      <div className="fixed bottom-30 left-1/2 -translate-x-1/2 z-50">
        <Link href={`/food_order/${token}/cart`}>
          <Button className="bg-yellow-400 border-black text-black px-5">{totalCount}
            <ShoppingCart className="w-6 h-6 pointer-events-none" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
