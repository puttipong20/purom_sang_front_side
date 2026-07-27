interface Food_type {
    id:string,
    created_at:string,
    food_img:string,
    food_name:string,
    food_price:number,
}
interface Room_type {
  id: string;
  room_name: string;
  room_main_img: string;
  room_gallery_img: string[]; // 👈 บอก TypeScript ชัดเจนว่าเป็น Array ของ string
  room_price: number;
  room_high_price:string;
  room_low_price:string;
  room_service: string[];
}
export type {Food_type,Room_type}