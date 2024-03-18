import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/store/Provider";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimpDaughters",
  description: "Created by s1sk0gryz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider theme={theme}>
          <Providers>
            {/* <NavBar /> */}
            <main>{children}</main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
