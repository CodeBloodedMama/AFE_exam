import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <title>Q07 - APP ROUTER</title>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
