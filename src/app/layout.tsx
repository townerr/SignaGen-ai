import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NavUser } from "~/components/NavUser";

export const metadata: Metadata = {
  title: "SignaGen",
  description: "Generate your new signature today!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NavUser />
        {children}
      </body>
    </html>
  );
}
