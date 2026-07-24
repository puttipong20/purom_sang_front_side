import FoodNavbar from "@/components/shared/food_navbar";
import Footer from "@/components/shared/footer";
import { CartProvider } from "@/context/CartContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartProvider>
        <FoodNavbar />
        <main className="mx-auto w-full flex-1 flex flex-col p-5">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </>
  );
}
