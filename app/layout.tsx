import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Car Sales | AI-Powered Price Predictions",
  description: "Predict future car prices with our advanced AI model. Get accurate 5-year price forecasts for any vehicle brand and type.",
  keywords: ["car prices", "AI prediction", "vehicle valuation", "car market", "price forecast"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased gradient-bg grid-pattern">
        {children}
      </body>
    </html>
  );
}
