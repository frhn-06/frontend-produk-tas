"use client"
// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import LandingPage from "@/components/views/LandingPage";
import { signOut } from "next-auth/react";
import Home from "@/components/views/Home";
// import Home from '@/components/views/Home'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function HomePage() {
  return (
    <LandingPageLayout title="Velaro Official">
      <Home />
    </LandingPageLayout>
  );
}
