import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import { pageTitle } from "@/portfolio";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Tunisian AI translator",
  description: "Tanslate dialect language to Tunisian Arabic 🇹🇳",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon.png" />
        <title>{metadata.title}</title>
      </head>
      <body className={jetbrainsMono.variable}>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <Header />
        <Toaster />
        {children}
        <Image
          src="/made.jpeg"
          width={300}
          height={300}
          className="rounded-xl m-8 flex absolute bottom-0 shadow-xl"
          alt="made in tunisia"
        />
      </body>
    </html>
  );
}
