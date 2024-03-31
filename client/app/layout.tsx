import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoSync",
  description: "EcoSync is a platform for managing waste in DNCC.",
  icons: {
    icon: "/logoBlack.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}><AntdRegistry><MantineProvider>{children}</MantineProvider></AntdRegistry></body>
    </html>
  );
}
