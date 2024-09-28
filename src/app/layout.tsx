import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";




export const metadata = {
  title: "teach.daba.School",
  description: "Teach.Daba provides an all-in-one platform for creators and tutors to create, launch, and manage their online academies",
  favicon: "/logo.png", 
 ogImage: "/logo.png", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    
    <html lang="en">
    <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* <link rel="icon" href={metadata.favicon} type="image/png" /> */}
       
          {/* Favicon */}
          <link rel="icon" href="/logo.png" type="image/png" />
          {/* Or for ICO format: <link rel="icon" href="/favicon.ico" type="image/x-icon" /> */}
          
          {/* Open Graph meta tags */}
          <meta property="og:image" content={metadata.ogImage} />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
      </Head>
      <body>{children}</body>
    </html>
    </>
  );
}
// //    <Head>
// {/* <link rel="icon" href="/favicon.ico" /> */}
// // </Head>

