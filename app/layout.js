import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import { pageTitle } from "@/portfolio";

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
        <Header />

        {children}
      </body>
    </html>
  );
}
