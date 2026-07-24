import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import FoodList from "@/components/food/food_list";

interface PageProps {
  params: Promise<{ token: string }>;
}
export default async function page({ params }: PageProps) {
  const {token} = await params
  const supabase = await createClient()
  const {data:room,error} = await supabase.from("rooms").select("room_name").eq("id",token).single()
  const {data:foods,error:food_err} = await supabase.from("foods").select("*")
  if(error){
    notFound();
  }
  if(food_err){
    return <p>ไม่มีรายการ</p>
  }
  
  return (
    <div>
      <p className="text-center text-xl font-bold">

      ห้อง : {room?.room_name}
      </p>
      <FoodList foods={foods} token={token}/>
    </div>
  )
}
