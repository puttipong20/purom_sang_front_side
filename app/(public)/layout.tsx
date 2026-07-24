// app/(public)/layout.tsx
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}